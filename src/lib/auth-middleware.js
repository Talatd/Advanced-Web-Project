import { NextResponse } from 'next/server';
import { extractToken, verifyToken } from './jwt';

/**
 * Authentication middleware for API routes
 * Returns the authenticated user or an error response
 * 
 * Usage in API routes:
 *   const authResult = authenticateRequest(request);
 *   if (authResult.error) return authResult.error;
 *   const user = authResult.user;
 */
export function authenticateRequest(request) {
    // Step 1: Extract token from Authorization header
    const token = extractToken(request);

    if (!token) {
        return {
            error: NextResponse.json(
                { success: false, error: 'Authentication required. Please login.' },
                { status: 401 }
            ),
            user: null
        };
    }

    // Step 2: Verify token (checks signature, expiration, and integrity)
    const result = verifyToken(token);

    if (!result.valid) {
        const status = result.expired ? 401 : 403;
        return {
            error: NextResponse.json(
                {
                    success: false,
                    error: result.error,
                    expired: result.expired || false,
                    tampered: result.tampered || false
                },
                { status }
            ),
            user: null
        };
    }

    // Step 3: Return the verified user
    return { error: null, user: result.user };
}
