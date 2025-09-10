// import { NextResponse } from "next/server";

// export function middleware() {
//   // authMiddleware req: NextRequest
//   // const response = authMiddleware(req);
//   // if (response) {
//   //   return response;
//   // }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/auth/v1/login"],
// };

import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/v1/login", req.url));
  }

  if (token && pathname.startsWith("/auth/v1/login")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/v1/login"],
};
