import React, { useState, useEffect } from 'react';
import { limitWords } from './../services/bookService';
import './HomePage.css';
import holder from './../../assets/book.svg';

const HomePage = () => {
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // IMPORTANT: Use the raw content URL if fetching from GitHub
    const featuredBooksURL = 'https://raw.githubusercontent.com/wincyysh/book-static-api/main/data/featuredBooks.json';

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await fetch(featuredBooksURL);
                const data = await response.json();
                setFeaturedBooks(data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <main className="home">
            <section id='preface'>
                <p>
                    Explore a curated collection of stories that shaped generations — from literary
                    classics to modern masterpieces.
                </p>
            </section>
            <hr className='penguin-divider' />
            <section id='featured-books'>
                {loading ? (
                    <div className='loading-shimmer'> Loading collection ... </div>
                ) : (
                    <div className='book-grid'>
                        {featuredBooks.map((book) => (
                            <div className='book-card' key={book.id}>
                                <div className='card-img-container'>
                                    <img src={book.coverImage && book.coverImage !== "" ? book.coverImage : holder} alt={book.title} />
                                </div>
                                <div className='intro'>
                                    <h3>{book.title}</h3>
                                    <h5>{book.authors}</h5>
                                    <p>{limitWords(book.description, 100)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default HomePage;