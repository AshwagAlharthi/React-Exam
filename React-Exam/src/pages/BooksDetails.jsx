import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

function BooksDetails() {
  const { book } = useParams();
  const APIKEY = "AejDU8r8hFhk7GJwpKuFqalJmwfWkgPU";
  const BooksURL = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${APIKEY}`;
  const [bookInfo, setBookInfo] = useState([]);

  const getSearchResults = () => {
    axios
      .get(BooksURL)
      .then(function (response) {
        // handle success
        console.log(response.data.results.books);
        const filteredBook = response.data.results.books.filter(
          (item) => item.title == book
        );
        console.log("filtered", filteredBook);
        setBookInfo(filteredBook);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };


  useEffect(() => {
    getSearchResults();
  }, []);

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="w-full h-full flex justify-center items-center my-6">
        <div className="w-[80%] h-full flex justify-center items-center flex-wrap gap-5 max-sm:w-full">
          {bookInfo[0] && (
            <div className="w-[80%] h-[70vh] bg-yellow-100 shadow-amber-950 shadow-lg max-sm:h-[80vh] flex justify-between items-start max-sm:flex-col max-sm:w-[95%] max-sm:items-center">
              <div className="w-[40%] h-full max-sm:w-full bg-white max-sm:h-[40%]">
                <img className="w-full h-full" src={bookInfo[0].book_image} />
              </div>
              <div className="w-[55%] h-full flex flex-col justify-start items-start gap-5 py-5 max-sm:w-full max-sm:px-3">
                <p className="font-bold text-lg">
                  Title:{" "}
                  <span className="font-normal">{bookInfo[0].title}</span>
                </p>
                <p className="font-bold text-lg">
                  Author:{" "}
                  <span className="font-normal">{bookInfo[0].author}</span>
                </p>
                <p className="font-bold text-lg">
                  Links to purchase the books:
                </p>
                {bookInfo[0].buy_links.map((link, index) => {
                  return (
                    <ul key={index}>
                      <li className="font-semibold">
                        - {link.name}{" "}
                        <a href={link.url} target="_blanck">
                          <span className="text-[0.8rem] hover:underline text-amber-800">
                            (visit)
                          </span>
                        </a>
                      </li>
                    </ul>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BooksDetails;
