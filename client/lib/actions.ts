"use server";

import { BASE_URL } from "./data-service";
import { redirect } from "next/navigation";

// export async function login(loginCreds: FormData) {
//   const username = loginCreds.get("username");
//   const password = loginCreds.get("password");

//   try {
//     const res = await fetch(`${BASE_URL}/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//       credentials: "include",
//     });
//     const data = await res.json();

//     if (!res.ok) {

//       const { message } = data;

//       throw new Error(message || "An error occurred!");
//     }
//   } catch (error) {
//     throw new Error(`${error.message}`);
//   }

//   redirect("/app");
// }

import { SignupFormSchema } from "@/lib/definitions";
import { FormState } from "@/app/_components/SignupForm";

export async function signupAction(prevState: FormState, formData: FormData) {
  const signupData = Object.fromEntries(formData);

  // 1. validate fields on server
  const validationResult = SignupFormSchema.safeParse(signupData);

  if (!validationResult.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(signupData)) {
      fields[key] = signupData[key].toString();
    }

    return {
      message: "Invalid form data.",
      fields,
    };
  }

  const { username, fullName, email, password } = validationResult.data;

  return { message: "Signup successful!" };

  //   try {
  //     const res = await fetch(`${BASE_URL}/signup`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, fullName, email, password }),
  //       credentials: "include",
  //     });
  //     const data = await res.json();

  //     if (!res.ok) {
  //       const { message } = data;

  //       throw new Error(message || "An error occurred!");
  //     }
  //   } catch (error) {
  //     throw new Error(`${error.message}`);
  //   }

  //   redirect("/app");
}
