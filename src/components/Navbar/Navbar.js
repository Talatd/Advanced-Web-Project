"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    if (pathname === '/login') return null;

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <nav className={styles.navbar} id="main-navbar">
            <div className={styles.container}>
                <Link href="/products" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                    </div>
                    <span className={styles.logoText}>SmartStore</span>
                    <span className={styles.logoBadge}>AI</span>
                </Link>

                <div className={styles.navLinks}>
                    <Link
                        href="/products"
                        className={`${styles.navLink} ${pathname === '/products' ? styles.navLinkActive : ''}`}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                        Products
                    </Link>
                </div>

                {user && (
                    <div className={styles.userSection}>
                        <div className={styles.userInfo}>
                            <div className={styles.userAvatar}>
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className={styles.userName}>{user.name}</span>
                        </div>
                        <button
                            id="logout-btn"
                            className={styles.logoutBtn}
                            onClick={handleLogout}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
