import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("id") || !localStorage.getItem("username")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="w-full h-[80%] flex flex-col justify-center items-center gap-5">
        <p className="text-4xl">Welocme {localStorage.getItem("username")}!</p>
        <div className="flex justify-center items-center gap-3 max-sm:flex-col">
          <Link to='/displayBooks'>
            <button className="btn w-52 bg-[#6F4E37] text-white hover:text-black">Display Books</button>
          </Link>
          <Link to='/favoriteBooks'>
            <button className="btn w-52 bg-[#6F4E37] text-white  hover:text-black">Favorites Books</button>
          </Link>
          <Link to='/readbook'>
            <button className="btn w-52 bg-[#6F4E37] text-white  hover:text-black">Read Books</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
