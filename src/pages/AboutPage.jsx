/* ===== booklist/src/pages/AboutPage.js ===== */
import React from "react";
import './AboutPage.css';

const AboutPage = () => {
    return (
        <div>
            <div className="about-page">
                <div><p>From a non-reader to a reader, my journey with books has been a life-changing one. I feel truly lucky to have self-taught myself how to read, and I hope others can also discover that same joy. Not every child grows up with bedtime stories, and not every adult learns how to read or write early in life — but it’s never too late. With patience, curiosity, and time, anyone can become a reader.</p></div>
                <div><p>If you’ve never finished a full book before, start small. Pick a book that truly interests you, or one with fewer pages. The goal isn’t perfection — it’s progress. Even if you don’t finish your first choice, don’t be discouraged. Start again with a new book. Every word, every sentence, every page you read counts — and you should be proud of yourself for each step.</p></div>
                <div><p>This small Book Recommendation Web App was built entirely by me. It collects book data from major publishers and APIs, but more importantly, it records my own journey of becoming a bookworm. When you share your own recommendations here, it becomes your journey too — a community built by readers, for readers.</p></div>
                <div><p>Unlike many book platforms that focus only on mainstream titles, this site welcomes every kind of book — any language, any topic, any author. Books connect us through ideas, culture, and imagination. Let’s celebrate that diversity together.</p></div>
            </div>
        </div>
    );
}

export default AboutPage;