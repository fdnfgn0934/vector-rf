import { jwtVerify, SignJWT } from "jose";

const secret = () => {
  const s = process.env.ADMIN_JWT_SECRET;
  if (!s) throw new Error("Missing ADMIN_JWT_SECRET");
  return new TextEncoder().encode(s);
};

export type AdminJwtPayload = {
  sub: string;           // user id (как строка)
  email: string;
  role: "ADMIN";
};

export async function signAdminJwt(payload: AdminJwtPayload) {
  const expires = process.env.ADMIN_JWT_EXPIRES || "7d";
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(secret());
}

export async function verifyAdminJwt(token: string) {
  const { payload } = await jwtVerify(token, secret());
  if (payload.role !== "ADMIN" || !payload.sub || !payload.email) {
    throw new Error("Invalid admin token");
  }
  return payload as unknown as AdminJwtPayload;
}
