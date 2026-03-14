import { lazy, useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { logEvent } from "firebase/analytics";
import { analytics } from './services/firebase';
import './App.css';

const AnalyticsTracker = () => {
    const location = useLocation();
    useEffect(() => {
        logEvent(analytics, 'page_view', { page_path: location.pathname });
    }, [location]);
    return null;
};

const HomePage = lazy(() => import('./pages/HomePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const ReadingListPage = lazy(() => import('./pages/ReadingListPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const AddYourOwnRecommendation = lazy(() => import('./components/AddYourOwnRecommendation'));

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        const newState = !menuOpen;
        setMenuOpen(newState);
        if (newState) {
            document.body.classList.add("menu-open");
        } else {
            document.body.classList.remove("menu-open");
        }
    };

    const closeMenu = () => {
        setMenuOpen(false);
        document.body.classList.remove("menu-open");
    };

    return (
        <Router basename="bk-recommendation">
            <AnalyticsTracker />
            <div id="begin">
                <div id='title-block'>
                    <h1>Timeless Modern Inspiration</h1>
                </div>
                <button className='menu-button' onClick={toggleMenu} aria-label='Navigation Menu'>
                    <span className="material-symbols-outlined">
                        {menuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>
            <div id='mobile-header' className={menuOpen ? 'open' : ''}>
                <nav id='nav-links'>
                    <ul>
                        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                        <li><Link to="/search" onClick={closeMenu}>Search</Link></li>
                        <li><Link to="/reading-list" onClick={closeMenu}>Publisher List</Link></li>
                        <li><Link to="/add-your-own" onClick={closeMenu}>Add Books</Link></li>
                        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                    </ul>
                </nav>
            </div>

            <main>
                <Suspense fallback={<div className="loading-shimmer">Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/reading-list" element={<ReadingListPage />} />
                        <Route path="/add-your-own" element={<AddYourOwnRecommendation />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Suspense>
            </main>

            <section id="quote">
                <p>“A reader lives a thousand lives before he dies. The man who never reads lives only one.”</p>
            </section>
            <footer>© 2026 The bk-recommendation — Designed with love for book readers</footer>
        </Router>
    );
};

export default App;