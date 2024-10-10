import { getToken } from "next-auth/jwt";
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from "next/server"

export default withAuth(
    async function middleware(request){
        const pathname = request.nextUrl.pathname;
        const isAuth = await getToken({ req: request });
        const isAuthRoute = pathname.startsWith('/signin');
        const protectedRoutes = ['/orders', '/profile'];
        const isProtectedRoute = protectedRoutes.some((route) =>
            pathname.startsWith(route)
        );
        if(!isAuth && isProtectedRoute){
            return NextResponse.redirect(new URL('/signin', request.url))
        }
        if (isAuthRoute && isAuth){
            return NextResponse.redirect(new URL('/', request.url))
        }
    },
    {
        callbacks: {
            async authorized(){
                return true;
            }
        }
    }
)

export const config = {
    matcher: ['/orders/:path*', '/profile/:path*', '/signin/:path*'],
}