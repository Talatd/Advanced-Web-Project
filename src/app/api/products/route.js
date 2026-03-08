import { NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getProductsByUser, searchProductsForUser, getProductsByCategoryForUser, getCategoriesForUser, getBrandsForUser } from '@/data/products';

export async function GET(request) {
    // Step 1: Authenticate the request - REQUIRE valid JWT
    const authResult = authenticateRequest(request);
    if (authResult.error) return authResult.error; // Returns 401/403
    const user = authResult.user;

    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        const category = searchParams.get('category');
        const sort = searchParams.get('sort');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        let results;

        // Step 2: All queries are filtered by user ID - data isolation
        if (query) {
            results = searchProductsForUser(query, user.id);
        } else if (category && category !== 'all') {
            results = getProductsByCategoryForUser(category, user.id);
        } else {
            results = getProductsByUser(user.id);
        }

        // Apply price filter
        if (minPrice) {
            results = results.filter(p => p.price >= parseFloat(minPrice));
        }
        if (maxPrice) {
            results = results.filter(p => p.price <= parseFloat(maxPrice));
        }

        // Apply sorting
        if (sort) {
            switch (sort) {
                case 'price-asc':
                    results.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    results.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    results.sort((a, b) => b.rating - a.rating);
                    break;
                case 'name':
                    results.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'newest':
                    results.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                    break;
            }
        }

        return NextResponse.json({
            success: true,
            products: results,
            total: results.length,
            categories: getCategoriesForUser(user.id),
            brands: getBrandsForUser(user.id)
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch products.' },
            { status: 500 }
        );
    }
}
