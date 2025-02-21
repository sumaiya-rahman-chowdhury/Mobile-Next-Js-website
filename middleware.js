import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/checkout",
    "/add-products",
    "/api/user/:path*",
    "/api/admin:path*",
  ],
};

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    console.log(url);
    const role = req?.nextauth?.token?.user?.role;
    if (
      url?.includes("/admin") &&
      (role !== "admin" || role !== "super-admin")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
     else if(
      url?.includes("/add-products") &&
      (role !== "admin" || role !== "super-admin")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) {
          return false;
        }
      },
    },
  }
);
