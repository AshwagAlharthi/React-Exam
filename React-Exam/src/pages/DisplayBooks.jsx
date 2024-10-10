import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

function DisplayBooks() {
  const [booksInfo, setBooksInfo] = useState([]);
  const APIKEY = "AejDU8r8hFhk7GJwpKuFqalJmwfWkgPU";
  const BooksURL = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${APIKEY}`;
  const URL = "https://67023988bd7c8c1ccd3e38fe.mockapi.io/login";
  const [usersInfo, setUsersInfo] = useState([]);
  const [favList, setFavList] = useState([]);
  const [readList, setReadList] = useState([]);
  const [favBook, setfavBook] = useState("");

  const getBooksData = () => {
    axios
      .get(BooksURL)
      .then(function (response) {
        // handle success
        console.log(response.data.results.books);
        setBooksInfo(response.data.results.books);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleFavButton = (book) => {
    setFavList([book, ...favList]);
    console.log("list", favList);
    // setfavBook(book);
    putFavoriteBooks();
  };

  const getUsersData = () => {
    axios
      .get(`${URL}/${localStorage.getItem("id")}`)
      .then(function (response) {
        // handle success
        console.log("userlike", response.data);
        setUsersInfo(response.data);
        // console.log('like',usersInfo.);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const putFavoriteBooks = () => {
    axios
      .put(`${URL}/${localStorage.getItem("id")}`, {
        // favoriteBooks: [...usersInfo.favoriteBooks, favBook]
        favoriteBooks: favList,
        readBooks: readList,
      })
      .then(function (response) {
        console.log(response);
        getUsersData();
        console.log("usersInfo", usersInfo);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleReadButton = (book) => {
    setReadList([book, ...readList]);
    console.log("read", readList);
    
    putFavoriteBooks();
  };

  useEffect(() => {
    getBooksData();
  }, []);

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="w-full h-full flex justify-center items-center my-6">
        <div className="w-[80%] h-full flex justify-start items-start flex-wrap gap-5 max-sm:w-full max-sm:justify-center max-lg:justify-center">
          {booksInfo &&
            booksInfo.map((book, index) => {
              return (
                <div
                  key={index}
                  className="w-[32%] h-[80vh] pb-2 bg-stone-200 flex flex-col justify-evenly shadow-amber-950 shadow-lg max-sm:w-[90%] max-lg:w-[45%]"
                >
                  <Link
                    to={`/booksDetails/${book.title}`}
                    className="w-full h-[80%]"
                  >
                    <img className="w-full h-[75%]" src={book.book_image} />
                    <p className="text-center font-bold text-lg py-2">
                      {book.title}
                    </p>
                    <p className="text-center">{book.author}</p>
                  </Link>
                  <div className="w-full flex flex-col justify-center items-center gap-2">
                    <button
                      //   onClick={() => handleFavButton(book.title)}
                      onClick={() => handleFavButton(book.title)}
                      className="btn rounded-xl w-52 h-10 min-h-10"
                    >
                      <p>add to Favorites</p>
                      <img
                        className="rounded-xl w-5 h-5"
                        src="https://cdn-icons-png.flaticon.com/512/20/20626.png"
                      />
                    </button>
                    <button
                      onClick={() => handleReadButton(book.title)}
                      className="btn rounded-xl w-52 h-10 min-h-10"
                    >
                      <p>add to Bookmark</p>
                      <img
                        className="rounded-xl w-5 h-5"
                        src="https://static.thenounproject.com/png/3810268-200.png"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default DisplayBooks;
