import { SignJWT, jwtVerify, JWTPayload } from "jose";

const encoder = new TextEncoder();

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return encoder.encode(secret);
}

export type AuthTokenPayload = JWTPayload & {
  email: string;
  role: string;
};

export async function signAuthToken(payload: { email: string; role: string }) {
  const secret = getSecret();

  return new SignJWT({ email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

export async function verifyAuthToken(token: string): Promise<AuthTokenPayload | null> {
  try {
    const secret = getSecret();
    const { payload } = await jwtVerify<AuthTokenPayload>(token, secret);
    return payload;
  } catch {
    return null;
  }
}

/** Extract Bearer token from Authorization header. */
export function getBearerToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  return authHeader.slice(7).trim() || null;
}

/**
 * Verify Bearer token from a Request. Use in protected API routes.
 * @returns Payload if valid, null otherwise
 */
export async function getAuthFromRequest(request: Request): Promise<AuthTokenPayload | null> {
  const authHeader = request.headers.get("Authorization");
  const token = getBearerToken(authHeader);
  if (!token) return null;
  return verifyAuthToken(token);
}

