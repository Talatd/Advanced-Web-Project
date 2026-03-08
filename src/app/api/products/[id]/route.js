import { NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getProductByIdForUser } from '@/data/products';

export async function GET(request, { params }) {
    // Step 1: Authenticate the request - REQUIRE valid JWT
    const authResult = authenticateRequest(request);
    if (authResult.error) return authResult.error; // Returns 401/403
    const user = authResult.user;

    try {
        const { id } = await params;

        // Step 2: Get product ONLY if it belongs to this user
        const product = getProductByIdForUser(id, user.id);

        if (product) {
            return NextResponse.json({ success: true, product });
        } else {
            // Could be either "not found" or "not yours" - don't reveal which
            return NextResponse.json(
                { success: false, error: 'Product not found.' },
                { status: 404 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch product.' },
            { status: 500 }
        );
    }
}
