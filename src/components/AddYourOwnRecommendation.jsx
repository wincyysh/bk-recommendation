/* ===== booklist/src/component/AddYourOwnRecommendation.js ===== */

import { get, ref, set, update } from "firebase/database";
import { fetchGoogleBookApi } from "./../services/bookService";
import { bookDB } from "../services/firebase";
import { lazy, useState } from "react";
import './AddYourOwnRecommendation.css';

const DisplayLive = lazy(() => import("./DisplayLive"));

async function checkBook(e, searchInput) {
  e.preventDefault();
  const result = await fetchGoogleBookApi("isbn:", searchInput);
  if (result && result?.items?.length > 0) {
    return result?.items[0]?.volumeInfo?.title;
  }
  else {
    console.log(" This an error", result);
    return null;
  }

}

function readUserData() {
  if (bookDB) {
    console.log("Accessed to database")
    return bookDB;
  } else {
    console.log("Cannot access database!")
    return null;
  }
}

// Initialize Realtime Database and get a reference to the service
async function writeUserData(isbn, bookName) {
  const bookDB = readUserData();

  try {
    const cleanISBN = isbn.replace(/[-\s]/g, "");
    const snapshot = await get(ref(bookDB, `booklist/${cleanISBN}`));
    if (snapshot.exists()) {
      const currentData = snapshot.val();
      const currentVotes = currentData.vote || 0;
      const newVotes = currentVotes + 1;
      await update(ref(bookDB, `booklist/${cleanISBN}`), { vote: newVotes });
    } else {
      await set(ref(bookDB, `booklist/${cleanISBN}`), {
        bookname: bookName,
        vote: 1
      })
        .then(() => console.log("Thank you for your recommendation! ", bookName))
        .catch((error) => console.log("Failed to add the book, the isbn exist ", error));
    }
  } catch (error) {
    console.error("Invalid ISBN", error);
  };
}

const AddYourOwnRecommendation = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div id="add-your-own">
      <div id="recommendation-title">
        <h2>Add Your Own Recommendation</h2>
        <p>
          Show us your favorite book
        </p>
      </div>
      <div >
        <form id="isbn-form" onSubmit={async (e) => {
          const bookName = await checkBook(e, searchInput);
          if (bookName) {
            await writeUserData(searchInput, bookName);
          }
        }}>
          <input
            type="text"
            id="isbn-input"
            placeholder="Book ISBN "
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" id="isbn-submit">Submit</button>
        </form>
        <DisplayLive />
      </div>
    </div>
  );
}

export default AddYourOwnRecommendation;