// ⚠️ This middleware has been temporarily disabled to avoid unnecessary edge function executions.
// To re-enable, rename this file to `middleware.ts`.
import { NextResponse } from "next/server";

export function middleware() {
  // authMiddleware req: NextRequest
  // const response = authMiddleware(req);
  // if (response) {
  //   return response;
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};
