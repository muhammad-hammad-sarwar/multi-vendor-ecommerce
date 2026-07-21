import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = (await cookies()).get("token");
  const sellerToken = (await cookies()).get("seller_token");
  const { pathname } = request.nextUrl;

  if (
    (sellerToken || token) &&
    (pathname === "/seller-login" ||
      pathname === "/seller-sign-up" ||
      pathname === "/login" ||
      pathname === "/sign-up")
  ) {
    return NextResponse.redirect(
      new URL(token ? "/profile" : "/seller/dashboard", request.url),
    );
  }

  if (!token && (pathname == "/checkout" || pathname.startsWith("/profile"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    !sellerToken &&
    ((pathname.startsWith("/shop") && !pathname.startsWith("/shop/preview")) ||
      (pathname.startsWith("/seller") &&
        pathname !== "/seller-login" &&
        pathname !== "/seller-sign-up"))
  ) {
    return NextResponse.redirect(new URL("/seller-login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/shop/:path*",
    "/seller/:path*",

    "/login",
    "/sign-up",

    "/seller-login",
    "/seller-sign-up",

    "/checkout",
  ],
};
