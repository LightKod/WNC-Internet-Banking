import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRole, handleRefreshToken } from "./app/lib/actions/api";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken =  cookies().get("accessToken")?.value;
  let role = null;
  if (accessToken) {
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    const exp = payload.exp * 1000;
    const now = Date.now();
    if (now > exp) {
      const response = await handleRefreshToken();
      console.log(await response.json());
    }
    try {
      const fetchRole = await checkRole(accessToken);
      role = (await fetchRole.json()).role;
    } catch (error) {
      console.log(error);
    }
  }
  if (pathname.startsWith("/login") && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (pathname.startsWith("/dashboard") && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/dashboard"],
};
