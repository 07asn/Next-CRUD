import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

export async function POST(req) {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
    );

    // ✅ Set Cookie
    cookies().set({
        name: 'token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });

    // ✅ Return success
    return Response.json({
        message: 'Logged in successfully',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
}
