"use server";

import { BASE_URL } from "./data-service";
import { redirect } from "next/navigation";

// export async function login(loginCreds: FormData) {
//   const username = loginCreds.get("username");
//   const password = loginCreds.get("password");

//   try {
//     const res = await fetch(`${BASE_URL}/users/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//       credentials: "include",
//     });
//     const data = await res.json();

//     if (!res.ok) {
//       console.log("selam");

//       const { message } = data;

//       throw new Error(message || "An error occurred!");
//     }
//   } catch (error) {
//     throw new Error(`${error.message}`);
//   }

//   redirect("/app");
// }
