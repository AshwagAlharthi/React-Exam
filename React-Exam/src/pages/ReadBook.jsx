import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

function ReadBook() {
  const URL = "https://67023988bd7c8c1ccd3e38fe.mockapi.io/login";
  const APIKEY = "AejDU8r8hFhk7GJwpKuFqalJmwfWkgPU";
  const BooksURL = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${APIKEY}`;
  const [favArray, setFavArray] = useState([]);
  const [newArray, setNewArray] = useState();
  const [userLikes, setUserLikes] = useState([]);

  const getUsersData = () => {
    axios
      .get(`${URL}/${localStorage.getItem("id")}`)
      .then(function (response) {
        // handle success
        console.log("userlike", response.data);
        // const likesBooks = response.data.filter()
        setUserLikes(response.data);
        // console.log("heeeere", userLikes.favoriteBooks);
        // console.log(typeof userLikes.favoriteBooks);

        // console.log('like',usersInfo.);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const getBooksInfo = () => {
    axios
      .get(BooksURL)
      .then(function (response) {
        // handle success
        console.log(response.data.results.books);
        const theData = response.data.results.books;
        // const filteredSearch = response.data.results.books.filter(
        //   (book) => book.title == userLikes.favoriteBooks
        // );

        // const filterData = theData.filter((item)=> item.title == userLikes.favoriteBooks.map(()));
        // setNewArray(filterData);
        console.log(filterData);

        setFavArray(theData);
        // console.log(favArray);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getBooksInfo();
  }, []);

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="w-full h-full flex justify-center items-center my-6">
        <div className="w-[80%] h-full flex justify-start items-start flex-wrap gap-5">
          {userLikes.readBooks &&
            //   userLikes.
            userLikes.readBooks.map((book, index) => {
              return (
                <Link
                  to={`/booksDetails/${book.title}`}
                  key={index}
                  className="w-[32%] h-[60vh] pb-2 bg-yellow-100 shadow-amber-950 shadow-lg"
                >
                  <img className="w-full h-[80%]" src={book.book_image} />
                  <p className="text-center font-bold text-lg py-2">{book}</p>
                  <p className="text-center">{book.author}</p>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ReadBook;
