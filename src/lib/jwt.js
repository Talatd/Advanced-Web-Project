import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

/**
 * Generate a JWT token for a user
 * The token contains: id, email, name, role
 * The signature ensures the payload cannot be tampered with
 */
export function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
    );
}

/**
 * Verify and decode a JWT token
 * If the token is tampered with (e.g., role changed), verification FAILS
 * because the signature won't match
 */
export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return { valid: true, user: decoded };
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return { valid: false, error: 'Token expired. Please login again.', expired: true };
        }
        if (error.name === 'JsonWebTokenError') {
            return { valid: false, error: 'Invalid token. Authentication failed.', tampered: true };
        }
        return { valid: false, error: 'Authentication failed.' };
    }
}

/**
 * Extract token from Authorization header
 * Expects format: "Bearer <token>"
 */
export function extractToken(request) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.substring(7); // Remove "Bearer " prefix
}
