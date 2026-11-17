export const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

interface HttpRequestProps {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const request = async <T = unknown>(
  path: string,
  { method = "GET", body }: HttpRequestProps,
): Promise<T> => {
  const url = `${BASE_URL}${path}`;

  const response = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new ApiError(await response.text(), response.status);
  }

  return response.status === 204 ? (null as unknown as T) : response.json();
};
