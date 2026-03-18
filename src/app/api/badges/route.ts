import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest } from "@/lib/jwt";
import { getBadgeCountsForUser, markBadgeSectionSeen } from "@/lib/badges";
import { resolveBadgeSectionPath } from "@/lib/badge-paths";

export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const badges = await getBadgeCountsForUser(auth.email);
    return NextResponse.json(badges);
  } catch (error) {
    console.error("Error fetching badges:", error);
    return NextResponse.json({ error: "Failed to fetch badges" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const path = typeof body?.path === "string" ? body.path : "";
    const section = resolveBadgeSectionPath(path);

    if (!section) {
      return NextResponse.json({ error: "Invalid badge section" }, { status: 400 });
    }

    await markBadgeSectionSeen(auth.email, section);
    return NextResponse.json({ success: true, section });
  } catch (error) {
    console.error("Error marking badge section as seen:", error);
    return NextResponse.json({ error: "Failed to update badge state" }, { status: 500 });
  }
}
