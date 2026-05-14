import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Only apply to /studio routes
  if (req.nextUrl.pathname.startsWith("/studio")) {
    const basicAuth = req.headers.get("authorization");

    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1];
      // Decode base64 credentials
      const [user, pwd] = atob(authValue).split(":");

      // Use the credentials from your .env file
      const validUser = process.env.ADMIN_EMAIL;
      const validPwd = process.env.ADMIN_PASSWORD;

      if (user === validUser && pwd === validPwd) {
        return NextResponse.next();
      }
    }

    // Trigger browser's native login popup
    return new NextResponse("Authentication Required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};
