import { useState } from "react";
import { limitWords, handleSearch } from "../services/bookService";
import './SearchPage.css';

const SearchPage = () => {
	const [searchType, setSearchType] = useState('');
	const [searchInput, setSearchInput] = useState('');
	const [error, setError] = useState(null);
	const [books, setBooks] = useState(null);
	const [loading, setLoading] = useState(false);

	const onSearch = async (e) => {
		setLoading(true);
		await handleSearch(e, searchType, searchInput, setError, setBooks);
		setLoading(false);
	};

	return (
		<div className="search-page-container">
			<header className="page-header">
				<h2>Find Your Next Great Read</h2>
				<p className="subtitle">Search millions of titles via the Google Books API</p>
			</header>

			<section className="search-section">
				<form onSubmit={onSearch} className="penguin-search-form">
					<div className="input-group">
						<select
							value={searchType}
							onChange={(e) => setSearchType(e.target.value)}
							aria-label="Search category"
						>
							<option value="">Category</option>
							<option value="intitle:">Title</option>
							<option value="inauthor:">Author</option>
							<option value="isbn:">ISBN</option>
							<option value="subject:">Subject</option>
						</select>

						<input
							type="search"
							placeholder="Books, Authors, ISBN..."
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>

						<button type="submit" className="btn-primary" disabled={loading}>
							{loading ? "Searching..." : "Search"}
						</button>
					</div>
				</form>
			</section>

			{error && <div className="error-message">{error}</div>}
			{books && (
				<div className="book-grid">
					{books.map((book) => {
						const info = book.volumeInfo;
						return (
							<article className="book-card" key={book.id}>
								<div className="card-img-container">
									<a href={info.infoLink} target='_blank' rel="noreferrer" >
										<img src={info.imageLinks?.thumbnail} />
									</a>
								</div>
								<div className="card-content">
									<span className="category-tag">{info.categories?.[0] || 'title'}</span>
									<h3>{info.title}</h3>
									<h5 className="author-name">By {info.authors?.join(', ') || "Unknown Author"}</h5>
									<p className="description">
										{limitWords(info.description, 25)}
									</p>
								</div>
							</article>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default SearchPage;