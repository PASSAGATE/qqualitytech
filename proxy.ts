import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { resolveUserRoleFromBackend } from "@/lib/backend/user-role";

export async function proxy(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({ request });

        cookiesToSet.forEach(
          ({
            name,
            value,
            options,
          }: {
            name: string;
            value: string;
            options: CookieOptions;
          }) => {
            response.cookies.set(name, value, options);
          },
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin");
  const isLoginRoute = path === "/login";

  if (!user && isAdminRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("error", "관리자 페이지는 로그인 후 이용할 수 있습니다.");
    return NextResponse.redirect(url);
  }

  if (user && isAdminRoute) {
    const role = session?.access_token
      ? await resolveUserRoleFromBackend(session.access_token)
      : null;

    if (role !== "ADMIN") {
      const url = request.nextUrl.clone();
      if (role === "CUSTOMER") {
        url.pathname = "/my-page";
        url.searchParams.set("error", "관리자 권한이 필요합니다.");
      } else {
        url.pathname = "/login";
        url.searchParams.set("error", "세션이 만료되었습니다. 다시 로그인해 주세요.");
      }
      return NextResponse.redirect(url);
    }
  }

  if (user && isLoginRoute) {
    const role = session?.access_token
      ? await resolveUserRoleFromBackend(session.access_token)
      : null;
    if (!role) {
      return response;
    }
    const url = request.nextUrl.clone();
    url.pathname = role === "ADMIN" ? "/admin" : "/my-page";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
