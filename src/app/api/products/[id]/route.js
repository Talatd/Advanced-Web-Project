import { NextResponse } from 'next/server';
import { getProductById } from '@/data/products';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const product = getProductById(id);

        if (product) {
            return NextResponse.json({ success: true, product });
        } else {
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
