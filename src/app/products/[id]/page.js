"use client";

import { useState, useEffect, use } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './productDetail.module.css';

export default function ProductDetailPage({ params }) {
    const { id } = use(params);
    const { user, loading, authFetch } = useAuth();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('features');
    const [aiQuery, setAiQuery] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [aiLoading, setAiLoading] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (id && user && authFetch) fetchProduct();
    }, [id, user, authFetch]);

    const fetchProduct = async () => {
        try {
            const res = await authFetch(`/api/products/${id}`);
            if (!res) return;
            const data = await res.json();
            if (data.success) {
                setProduct(data.product);
            }
        } catch (error) {
            console.error('Failed to fetch product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAiQuery = async () => {
        if (!aiQuery.trim() || aiLoading) return;

        setAiLoading(true);
        setAiResponse('');

        try {
            const res = await authFetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `About the product "${product.name}": ${aiQuery}`,
                    history: []
                }),
            });

            const data = await res.json();
            setAiResponse(data.response || 'Could not get a response.');
        } catch (error) {
            setAiResponse('Failed to connect to AI. Please try again.');
        } finally {
            setAiLoading(false);
        }
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

    const formatAiResponse = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br/>')
            .replace(/- (.*?)(<br\/>|$)/g, '<span style="display:block;padding-left:12px;">• $1</span>');
    };

    if (loading || !user || isLoading) {
        return (
            <div className={styles.loadingScreen}>
                <div className={styles.loader}></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className={styles.notFound}>
                <h2>Product Not Found</h2>
                <p>The product you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/products" className="btn btn-primary">
                    Back to Products
                </Link>
            </div>
        );
    }

    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    return (
        <div className={styles.detailPage}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
                <Link href="/products" className={styles.breadcrumbLink}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Products
                </Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbCategory}>{product.category}</span>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbCurrent}>{product.name}</span>
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
                {/* Left - Product Image */}
                <div className={styles.imageSection}>
                    <div className={styles.mainImage}>
                        <div className={styles.imagePlaceholder}>
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                <line x1="12" y1="17" x2="12" y2="21"></line>
                            </svg>
                            <span>{product.subcategory}</span>
                        </div>
                        {discount > 0 && (
                            <span className={styles.discountBadge}>-{discount}% OFF</span>
                        )}
                    </div>
                    <div className={styles.thumbnails}>
                        {product.images.map((_, index) => (
                            <div key={index} className={`${styles.thumbnail} ${index === 0 ? styles.thumbnailActive : ''}`}>
                                <span>{index + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right - Product Details */}
                <div className={styles.detailsSection}>
                    <div className={styles.productHeader}>
                        <span className={styles.brand}>{product.brand}</span>
                        <h1 className={styles.productName}>{product.name}</h1>
                        <div className={styles.ratingRow}>
                            <div className={styles.stars}>
                                {renderStars(product.rating)}
                            </div>
                            <span className={styles.ratingValue}>{product.rating}</span>
                            <span className={styles.reviewCount}>({product.reviewCount.toLocaleString()} reviews)</span>
                            <span className={`${styles.stockStatus} ${product.stock > 50 ? styles.inStock : product.stock > 0 ? styles.lowStock : styles.outOfStock}`}>
                                {product.stock > 50 ? '✓ In Stock' : product.stock > 0 ? `⚠ Only ${product.stock} left` : '✕ Out of Stock'}
                            </span>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className={styles.pricing}>
                        <span className={styles.currentPrice}>${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <>
                                <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
                                <span className={styles.savingsTag}>Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                            </>
                        )}
                    </div>

                    {/* Description */}
                    <p className={styles.description}>{product.description}</p>

                    {/* Tags */}
                    <div className={styles.tags}>
                        {product.tags.map(tag => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                    </div>

                    {/* SKU */}
                    <div className={styles.sku}>
                        SKU: <span>{product.sku}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.actions}>
                        <button className={`btn btn-primary btn-lg ${styles.addToCartBtn}`} id="add-to-cart-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            Add to Cart
                        </button>
                        <button className={`btn btn-secondary btn-lg ${styles.wishlistBtn}`} id="wishlist-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className={styles.tabsSection}>
                <div className={styles.tabsHeader}>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'features' ? styles.tabBtnActive : ''}`}
                        onClick={() => setActiveTab('features')}
                    >
                        Features
                    </button>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'specifications' ? styles.tabBtnActive : ''}`}
                        onClick={() => setActiveTab('specifications')}
                    >
                        Specifications
                    </button>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'ai-analysis' ? styles.tabBtnActive : ''}`}
                        onClick={() => setActiveTab('ai-analysis')}
                    >
                        🤖 AI Analysis
                    </button>
                </div>

                <div className={styles.tabContent}>
                    {activeTab === 'features' && (
                        <div className={styles.featuresList}>
                            {product.features.map((feature, index) => (
                                <div key={index} className={styles.featureItem}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'specifications' && (
                        <div className={styles.specsList}>
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <div key={key} className={styles.specRow}>
                                    <span className={styles.specKey}>{key}</span>
                                    <span className={styles.specValue}>{value}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'ai-analysis' && (
                        <div className={styles.aiSection}>
                            <div className={styles.aiHeader}>
                                <div className={styles.aiIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                </div>
                                <div>
                                    <h3>AI Product Analysis</h3>
                                    <p>Ask our AI assistant about this product. Get detailed insights, comparisons, and recommendations.</p>
                                </div>
                            </div>

                            <div className={styles.aiQuerySection}>
                                <div className={styles.quickQueries}>
                                    <span className={styles.quickLabel}>Quick questions:</span>
                                    {[
                                        'What are the pros and cons?',
                                        'Who is this best for?',
                                        'Is this worth the price?',
                                        'What are similar alternatives in your catalog?'
                                    ].map((q, i) => (
                                        <button
                                            key={i}
                                            className={styles.quickBtn}
                                            onClick={() => setAiQuery(q)}
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>

                                <div className={styles.aiInputWrapper}>
                                    <input
                                        id="ai-product-query"
                                        type="text"
                                        className={styles.aiInput}
                                        value={aiQuery}
                                        onChange={(e) => setAiQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAiQuery()}
                                        placeholder={`Ask about ${product.name}...`}
                                        disabled={aiLoading}
                                        maxLength={500}
                                    />
                                    <button
                                        id="ai-query-btn"
                                        className={styles.aiSendBtn}
                                        onClick={handleAiQuery}
                                        disabled={!aiQuery.trim() || aiLoading}
                                    >
                                        {aiLoading ? (
                                            <span className={styles.spinner}></span>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {aiResponse && (
                                <div className={styles.aiResponse}>
                                    <div className={styles.aiResponseHeader}>
                                        <div className={styles.aiResponseIcon}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                        </div>
                                        <span>AI Analysis</span>
                                    </div>
                                    <div
                                        className={styles.aiResponseContent}
                                        dangerouslySetInnerHTML={{ __html: formatAiResponse(aiResponse) }}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
