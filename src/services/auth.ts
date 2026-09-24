import { getSession } from "./session";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo iniciar sesión");
  }

  return data;
}

export async function register(
  username: string,
  email: string,
  name: string,
  password: string
) {
  const response = await fetch(`${API_URL}/users/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: username, email, name, password, UserId : getSession().id }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo crear la cuenta");
  }

  return data.id;

  
}
