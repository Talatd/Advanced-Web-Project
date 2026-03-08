"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './products.module.css';

export default function ProductsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [products, selectedCategory, searchQuery, sortBy]);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (data.success) {
                setProducts(data.products);
                setCategories(data.categories);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filterProducts = () => {
        let result = [...products];

        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q))
            );
        }

        if (sortBy) {
            switch (sortBy) {
                case 'price-asc':
                    result.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    result.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    result.sort((a, b) => b.rating - a.rating);
                    break;
                case 'name':
                    result.sort((a, b) => a.name.localeCompare(b.name));
                    break;
            }
        }

        setFilteredProducts(result);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} className={styles.starFull}>★</span>);
        }
        if (hasHalf) {
            stars.push(<span key="half" className={styles.starHalf}>★</span>);
        }
        for (let i = stars.length; i < 5; i++) {
            stars.push(<span key={`empty-${i}`} className={styles.starEmpty}>★</span>);
        }
        return stars;
    };

    if (loading || !user) {
        return (
            <div className={styles.loadingScreen}>
                <div className={styles.loader}></div>
            </div>
        );
    }

    return (
        <div className={styles.productsPage}>
            {/* Hero Section */}
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Discover Amazing
                        <span className={styles.heroGradient}> Products</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Browse our curated collection of premium tech. Use AI assistant for smart recommendations.
                    </p>
                </div>
            </div>

            {/* Filters Bar */}
            <div className={styles.filtersBar}>
                <div className={styles.filtersContainer}>
                    {/* Search */}
                    <div className={styles.searchWrapper}>
                        <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            id="product-search"
                            type="text"
                            className={styles.searchInput}
                            placeholder="Search products, brands, features..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                className={styles.clearSearch}
                                onClick={() => setSearchQuery('')}
                                aria-label="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Category Filter */}
                    <div className={styles.filterGroup}>
                        <label>Category</label>
                        <select
                            id="category-filter"
                            className={styles.select}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sort */}
                    <div className={styles.filterGroup}>
                        <label>Sort by</label>
                        <select
                            id="sort-filter"
                            className={styles.select}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="">Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                            <option value="name">Name A-Z</option>
                        </select>
                    </div>

                    <div className={styles.resultCount}>
                        <span className={styles.countNumber}>{filteredProducts.length}</span> products
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className={styles.productsSection}>
                {isLoading ? (
                    <div className={styles.loadingGrid}>
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className={styles.skeletonCard}>
                                <div className={`${styles.skeletonImage} skeleton`}></div>
                                <div className={styles.skeletonContent}>
                                    <div className={`${styles.skeletonLine} skeleton`} style={{ width: '60%' }}></div>
                                    <div className={`${styles.skeletonLine} skeleton`} style={{ width: '80%' }}></div>
                                    <div className={`${styles.skeletonLine} skeleton`} style={{ width: '40%' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className={styles.emptyState}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <h3>No products found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                        <button className="btn btn-secondary" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className={`${styles.productsGrid} stagger-children`}>
                        {filteredProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                className={styles.productCard}
                                id={`product-card-${product.id}`}
                            >
                                {/* Product Image */}
                                <div className={styles.productImageWrapper}>
                                    <div className={styles.productImagePlaceholder}>
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                            <line x1="8" y1="21" x2="16" y2="21"></line>
                                            <line x1="12" y1="17" x2="12" y2="21"></line>
                                        </svg>
                                        <span>{product.category}</span>
                                    </div>

                                    {/* Badges */}
                                    <div className={styles.productBadges}>
                                        {product.originalPrice && (
                                            <span className={styles.saleBadge}>
                                                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                            </span>
                                        )}
                                        {product.stock < 20 && (
                                            <span className={styles.stockBadge}>Low Stock</span>
                                        )}
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className={styles.productInfo}>
                                    <div className={styles.productMeta}>
                                        <span className={styles.productBrand}>{product.brand}</span>
                                        <span className={styles.productCategory}>{product.subcategory}</span>
                                    </div>

                                    <h3 className={styles.productName}>{product.name}</h3>

                                    <div className={styles.productRating}>
                                        <div className={styles.stars}>
                                            {renderStars(product.rating)}
                                        </div>
                                        <span className={styles.ratingText}>
                                            {product.rating}
                                            <span className={styles.reviewCount}>({product.reviewCount.toLocaleString()})</span>
                                        </span>
                                    </div>

                                    <div className={styles.productTags}>
                                        {product.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>

                                    <div className={styles.productPricing}>
                                        <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
                                        {product.originalPrice && (
                                            <span className={styles.productOriginalPrice}>${product.originalPrice.toFixed(2)}</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
