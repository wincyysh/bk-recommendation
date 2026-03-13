/* ===== booklist/src/component/DisplayLive.js ===== */
import { onValue, ref, off } from "firebase/database";
import { useState, useEffect } from "react";
import { bookDB } from "../services/firebase";

export default function DisplayLive() {
    const [booklist, setBooklist] = useState({});

    useEffect(() => {
        const bookRef = ref(bookDB, "booklist");
        console.log(bookRef);
        onValue(bookRef, (snapshot) => {
            setBooklist(snapshot.exists() ? snapshot.val() : {});
        });
        return () => off(bookRef);
    }, []);

    return (
        <div className="modern-form">
            {Object.keys(booklist).length === 0 ? (
                <h2>Booklist is empty</h2>
            ) : (
                Object.entries(booklist).map(([isbn, book]) => (
                    <div key={isbn} >
                        <h4>{book.bookname}</h4>
                        <span className="vote-count">{book.vote} votes</span>
                    </div>
                ))
            )}
        </div>
    );
}