import axios from "axios";
import React, { useEffect, useState } from "react";
import "./books.css"
const baseURL = "http://localhost:8000/api/v1/public/books";

export default function AxiosFetch() {
  const [books, setBooks] = useState([]); // Use an array to store the list of books
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(baseURL);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  //ensure that the call completed
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="books-container">
      {books.map((book) => (
        <div className="book-card" key={book.id}>
          <h1>{book.name}</h1>
          <p>Author: {book.author}</p>
          <p>Library: {book.lib}</p>
          <img
            src={`http://localhost:8000${book.cover_img}`}
            alt="Book Cover"
            width="200"
            height="300"
          />
        </div>
      ))}
    </div>
  );
}