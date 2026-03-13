/* bookService.js */
import React, { useState } from "react";

export const fetchGoogleBookApi = async (type, query) => {
    const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${type}${query}&key=${apiKey}`;
    const response = await fetch(url);
    if (response.status === 429) {
        throw new Error("RATE_LIMIT_REACHED");
    }
    if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
    return await response.json();
};

export function limitWords(text, wordLimit) {
    if (!text || typeof (text) !== "string") return "No description available";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + " ... ";
}

export async function handleSearch(e, searchType, searchInput, setError, setBooks) {
    e.preventDefault();
    const query = searchInput.trim();

    if (!searchType) { setError("Please select a type!"); return; }
    else if (!query) { setError("Search cannot be empty!"); return; }

    const cacheKey = `search-${searchType}-${query}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        console.log("Loading results from cache...");
        setBooks(JSON.parse(cachedData));
        setError(null);
        return; // Exit early! No API call needed.
    }
    try {
        const result = await fetchGoogleBookApi(searchType, query);

        if (!result || !result.items) {
            setBooks(null);
            setError("Cannot find the Book or author in Google books API.");
        } else {
            localStorage.setItem(cacheKey, JSON.stringify(result.items));
            setBooks(result.items);
            setError(null);
        }
    } catch (error) {
        console.error("There is an error: ", error);

        if (error.message === "RATE_LIMIT_REACHED") { alert("Google Books API limit reached. Please wait a moment."); }

        setBooks(null);
        setError(error.message);
    }
}