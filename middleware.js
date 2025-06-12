import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = req.nextUrl.clone();
  const publicPaths = ["/login", "/signin", "/favicon.ico"];

  const isPublic =
    publicPaths.some((path) => url.pathname.startsWith(path)) ||
    url.pathname.startsWith("/fonts") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next");

  // اگر کاربر وارد نشده و صفحه عمومی نیست، بفرستش به لاگین
  if (!isPublic && !session) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // اگه کاربر وارد شده و داره میره لاگین یا ساین‌این، بفرستش صفحه اصلی
  if (session && (url.pathname === "/login" || url.pathname === "/signin")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/((?!static|.*\\..*).*)"],
};

// import { NextResponse } from "next/server";
//
// export function middleware(request) {
//   const url = request.nextUrl.clone();
//   const token = request.cookies.get("sb-access-token")?.value;
//
//   const publicPaths = ["/login", "/signin", "/favicon.ico"];
//   const isPublic =
//     publicPaths.some((path) => url.pathname.startsWith(path)) ||
//     url.pathname.startsWith("/fonts") ||
//     url.pathname.startsWith("/api") ||
//     url.pathname.startsWith("/_next");
//
//   if (!isPublic && !token) {
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }
//
//   if ((url.pathname === "/login" || url.pathname === "/signin") && token) {
//     url.pathname = "/";
//     return NextResponse.redirect(url);
//   }
//
//   return NextResponse.next();
// }
//
// export const config = {
//   matcher: ["/((?!static|.*\\..*).*)"],
// };

// export function middleware(request) {}
