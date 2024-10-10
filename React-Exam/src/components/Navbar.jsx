import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearchButton = () => {
    if (searchValue !== "") {
      navigate(`/search/${searchValue}`);
    }
  };
  return (
    <div className="navbar bg-gray-300">
      <div className="flex-1 gap-4">
        <Link to="/home">
          <p className="btn btn-ghost text-xl">
            <img className="w-10 h-10" src="https://cdn-icons-png.flaticon.com/512/3429/3429149.png"/>
          </p>
        </Link>
        <Link to="/displayBooks">
          <p className="hover:underline">Display Books</p>
        </Link>
        <Link to="/favoriteBooks">
          <p className="hover:underline">Favorites Books</p>
        </Link>
        <Link to="/readbook">
          <p className="hover:underline">Read Books</p>
        </Link>
      </div>
      <div className="flex-none gap-3">
        <div className="flex justify-center items-center">
          <div className="form-control">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <button
            onClick={handleSearchButton}
            className="btn bg-[#6F4E37] rounded-full w-11 h-11 min-h-11 text-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="white"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
        <p className="ml-5">{localStorage.getItem("username")}</p>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">
                <p className="text-sm font-bold text-red-900">Logout</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
