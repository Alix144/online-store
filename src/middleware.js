import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request) {
    const pathname = request.nextUrl.pathname;

    const token = await getToken({ req: request });
    const unauthenticatedRoutes = pathname.startsWith("/signin");
    const protectedRoutes = ["/orders", "/profile", "/cart", "/favorites", "/order-successful"];
    const adminRoutes = ["/admin"];

    //checking if the current route is for admins only or not
    const isAdminRoute = adminRoutes.some((route) =>
      pathname.startsWith(route)
    );

    //checking if the current route is private or not
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    //checking if the current route is private or not
    const isPrivateRoute = privateRoutes.some((route) =>
      pathname.startsWith(route)
    );

    // if users are unauthenticated and try to access private routes they get directed to signin page
    if (!token && isProtectedRoute) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    // if users are authenticated and try to access auth routes they get directed to home
    if (token && unauthenticatedRoutes) {
      console.log(isAdminRoute);
      return NextResponse.redirect(new URL("/", request.url));
    }

    //if admin trys to access users pages he gets directed to another page
    if (isProtectedRoute && token?.email === "aliiyousseff144@gmail.com") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    //if users try access admin pages they get directed to another page
    if (isAdminRoute && token?.email != "aliiyousseff144@gmail.com") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/cart/:path*",
    "/favorites/:path*",
    "/orders/:path*",
    "/products/:path*",
    "/profile/:path*",
    "/order-successful/:path*",
    
    "/signin/:path*",
    "/admin/:path*",
  ],
};
