export const BASE_URL = "http://localhost:8000/api/v1";

export const getInvoices = async function () {
  const res = await fetch(`http://localhost:3000/api/invoices`);

  const { data } = await res.json();

  return data;
};

export const hasAuth = async function (jwt: string): Promise<{
  isAuthenticated: boolean;
  message: string;
}> {
  const res = await fetch(`${BASE_URL}/users/check-auth`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: jwt,
    },
  });

  const data = await res.json();

  return data;
};

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const res = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      console.log("selam");

      const { message } = data;

      throw new Error(message || "An error occurred!");
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }

  // redirect("/app");
}
