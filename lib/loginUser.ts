export async function loginUser(email: string, password: string): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL no está definida en las variables de entorno.");
  }

  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    // Opcional: podrías leer el body para mostrar un mensaje de error más detallado
    throw new Error(`Error al iniciar sesión: ${response.status}`);
  }

  const data: { accessToken: string } = await response.json();
  return data.accessToken;
}
