export type AppUserRole = "ADMIN" | "CUSTOMER";

type BackendMeResponse = {
  role?: string;
};

function apiBaseUrl() {
  return (
    process.env.BACKEND_API_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:4000/api/v1"
  );
}

export async function resolveUserRoleFromBackend(
  accessToken: string,
): Promise<AppUserRole | null> {
  try {
    const response = await fetch(`${apiBaseUrl()}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as BackendMeResponse;
    const normalizedRole = (data.role ?? "").toUpperCase();

    if (normalizedRole === "ADMIN" || normalizedRole === "CUSTOMER") {
      return normalizedRole;
    }

    return null;
  } catch {
    return null;
  }
}
