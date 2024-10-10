import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function Search() {
  const { keyword } = useParams();
  const APIKEY = "AejDU8r8hFhk7GJwpKuFqalJmwfWkgPU";
  const BooksURL = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${APIKEY}`;
  const [searchResults, setSearchResults] = useState([]);

  const getSearchResults = () => {
    axios
      .get(BooksURL)
      .then(function (response) {
        // handle success
        console.log(response.data.results.books);
        const filteredSearch = response.data.results.books.filter(
          (book) => book.title == keyword
        );
        setSearchResults(filteredSearch);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getSearchResults();
  }, [keyword]);

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="w-full h-full flex justify-center items-center my-6">
        <div className="w-[80%] h-full flex justify-start items-start flex-wrap gap-5">
          {searchResults &&
            searchResults.map((book, index) => {
              return (
                <Link to={`/booksDetails/${book.title}`}
                  key={index}
                  className="w-[32%] h-[60vh] pb-2 bg-yellow-100 shadow-amber-950 shadow-lg"
                >
                  <img className="w-full h-[80%]" src={book.book_image} />
                  <p className="text-center font-bold text-lg py-2">
                    {book.title}
                  </p>
                  <p className="text-center">{book.author}</p>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Search;
