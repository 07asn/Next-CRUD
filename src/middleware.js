import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/login", "/register"];

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    // Allow public routes
    if (PUBLIC_ROUTES.includes(pathname)) return NextResponse.next();
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);
        return NextResponse.next();

    } catch (err) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: [
        "/",
    ],
};
