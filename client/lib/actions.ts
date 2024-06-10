"use server";

import { BASE_URL } from "./data-service";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const loginCreds = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  console.log(loginCreds);

  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCreds),
    });
    const data = await res.json();

    if (!res.ok) {
      console.log("shalom");

      const { message } = data;

      throw new Error(message || "An error occurred!");
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }

  redirect("/app");
}
