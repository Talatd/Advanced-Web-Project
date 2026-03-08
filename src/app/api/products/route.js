import { NextResponse } from 'next/server';
import { getAllProducts, searchProducts, getProductsByCategory, getCategories, getBrands } from '@/data/products';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        const category = searchParams.get('category');
        const sort = searchParams.get('sort');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        let results;

        if (query) {
            results = searchProducts(query);
        } else if (category && category !== 'all') {
            results = getProductsByCategory(category);
        } else {
            results = getAllProducts();
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
            categories: getCategories(),
            brands: getBrands()
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch products.' },
            { status: 500 }
        );
    }
}
