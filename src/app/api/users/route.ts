import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { hashPassword } from "@/lib/password";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { createNotification } from "@/lib/notifications";

function requireAdmin(auth: { role: string } | null) {
  if (!auth || auth.role !== "Admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }
  return null;
}

/** HOD can only create Staff/Personnel/Corp Member in their department */
const HOD_ALLOWED_ROLES = ["Staff", "Personnel", "Corp Member"];

async function getHodDepartment(auth: { email: string; role: string }) {
  if (auth.role !== "HOD") return null;
  const user = await prisma.user.findUnique({
    where: { email: auth.email },
    select: { department: true },
  });
  return user?.department || null;
}

/**
 * GET /api/users - List users.
 * Query: role, department, departments[] (admin sees all when no filter)
 */
export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");
  const department = searchParams.get("department");
  const departments = searchParams.getAll("department");

  try {
    const where: { role?: string; department?: string | null; OR?: { department: string }[] } = {};
    if (role) where.role = role;
    if (departments.length > 0) {
      where.OR = departments.map((d) => ({ department: d }));
    } else if (department) {
      where.department = department;
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        department: true,
      },
      orderBy: [{ role: "asc" }, { email: "asc" }],
    });

    createNotification({
      actorEmail: auth.email,
      actionType: 'VIEW_USERS',
      message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) viewed the users list.`
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to fetch users", ...(process.env.NODE_ENV === "development" && { details: message }) },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users - Create user (admin or HOD for their department)
 * HOD can only create Staff/Personnel/Corp Member in their own department.
 */
export async function POST(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = auth.role === "Admin";
  const hodDept = await getHodDepartment(auth);

  if (!isAdmin && !hodDept) {
    return NextResponse.json({ error: "Admin or HOD access required" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { email, password, name, role, department } = body as {
      email?: string;
      password?: string;
      name?: string;
      role?: string;
      department?: string;
    };

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }
    if (!role || typeof role !== "string" || !role.trim()) {
      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }

    const dept = department?.trim() || null;

    if (hodDept) {
      if (dept !== hodDept) {
        return NextResponse.json({ error: "HOD can only create users in their own department" }, { status: 403 });
      }
      if (!HOD_ALLOWED_ROLES.includes(role.trim())) {
        return NextResponse.json(
          { error: "HOD can only create Staff, Personnel, or Corp Member roles" },
          { status: 403 }
        );
      }
    }

    const emailLower = email.trim().toLowerCase();
    const passwordHash = hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email: emailLower,
        password: passwordHash,
        name: name?.trim() || null,
        role: role.trim(),
        department: dept,
      },
      select: { id: true, email: true, name: true, role: true, department: true },
    });

    emitRealtimeEvent({
      type: "user:created",
      entity: "user",
      action: "created",
      entityId: user.id,
    });

    createNotification({
      actorEmail: auth.email,
      actionType: 'CREATE_USER',
      targetId: user.id,
      message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) created a new user: ${user.name || user.email}`
    });

    return NextResponse.json(user);
  } catch (error: unknown) {
    const prismaErr = error as { code?: string };
    if (prismaErr.code === "P2002") {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
