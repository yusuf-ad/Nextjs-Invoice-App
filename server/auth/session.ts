// it prevents the code from being bundled in the client-side code
"server-only";

import { SignJWT, jwtVerify } from "jose";
import type { SessionPayload } from "@/lib/definitions/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

const cookie = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()

    .setExpirationTime("24hr")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.log("Failed to verify session");
    return null;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + cookie.duration);

  const session = await encrypt({
    userId,
    expiresAt,
  });

  cookies().set(cookie.name, session, {
    ...cookie.options,
    expires: expiresAt,
    sameSite: cookie.options.sameSite as "lax" | "strict" | "none",
  });

  redirect("/app");
}

export async function verifySession() {
  const cookie = cookies().get("session")?.value;

  const session = await decrypt(cookie);

  if (!session?.userId) {
    cookies().delete("session");

    redirect("/login");
  }

  return { userId: session.userId };
}

export async function deleteSession() {
  cookies().delete("session");

  redirect("/");
}
