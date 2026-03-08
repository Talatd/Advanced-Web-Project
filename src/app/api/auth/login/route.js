import { NextResponse } from 'next/server';
import { authenticateUser } from '@/data/users';
import { generateToken } from '@/lib/jwt';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: 'Email and password are required.' },
                { status: 400 }
            );
        }

        const user = authenticateUser(email, password);

        if (user) {
            // Generate JWT token
            const token = generateToken(user);

            return NextResponse.json({
                success: true,
                user,
                token, // Send JWT token to client
                message: 'Login successful!'
            });
        } else {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password.' },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'An error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
