import { useState } from "react";
import { limitWords } from "../services/bookService";
import "./ReadingListPage.css"; 

const ReadingListPage = () => {
    const penguin = "https://wincyysh.github.io/book-static-api/data/penguin.json";
    const goodreads = "https://wincyysh.github.io/book-static-api/data/goodreads.json";
    const nytimes = "https://wincyysh.github.io/book-static-api/data/nytimes.json";

    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleClick = async (jsonUrl) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(jsonUrl);
            const data = await response.json();
            if (!data) { 
                setError("Failed to load the reading list. Please try again!"); 
                return; 
            }
            setBooks(data);
        } catch (error) {
            console.error("Failed to load list", error);
            setError(`Failed to load the reading list: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="publisher">
            <header id="publisher-title">
                <h2>Curious about what publishers recommend?</h2>
                <p>
                    Explore collections curated by industry experts. Each list reflects 
                    a unique vision—from timeless classics to modern discoveries.
                </p>
            </header>

            <nav className="button">
                <div className="row">
                    <button disabled={loading} onClick={() => handleClick(nytimes)}>NYTimes</button>
                    <button disabled={loading} onClick={() => handleClick(penguin)}>Penguin</button>
                    <button disabled={loading} onClick={() => handleClick(goodreads)}>Goodreads</button>
                </div>
            </nav>

            {error && <div className="error-banner">{error}</div>}
            
            {loading && <div className="loading-shimmer">Loading collection...</div>}

            {books && books.length > 0 && (
                <div className="book-grid">
                    {books.map((book, index) => (
                        <article className="book-card" key={index}>
                            <div className="card-img-container">
                                <a href={book.link} target="_blank" rel="noreferrer">
                                    {book.cover ? (
                                        <img 
                                            src={`https://images.weserv.nl/?url=${encodeURIComponent(book.cover)}&w=400&q=80`} 
                                            loading="lazy" 
                                            alt={book.title} 
                                        />
                                    ) : (
                                        <img 
                                            className="placeholder" 
                                            src="https://placehold.co/400x600?text=No+Cover" 
                                            alt="No cover available"
                                        />
                                    )}
                                </a>
                            </div>
                            <div className="intro">
                                <span className="category-tag">Recommendation</span>
                                <h3>{book.title}</h3>
                                <h5 className="author-name">by {book.authors}</h5>
                                <p>{limitWords(book.description, 45)}</p>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReadingListPage;