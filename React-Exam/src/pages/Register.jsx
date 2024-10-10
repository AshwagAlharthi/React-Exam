import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  if (localStorage.getItem("id") || localStorage.getItem("username")) {
    localStorage.removeItem("id");
    localStorage.removeItem("username");
  }

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usersInfo, setUsersInfo] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");
  const URL = "https://67023988bd7c8c1ccd3e38fe.mockapi.io/login";
  const navigate = useNavigate();

  const getUsersData = () => {
    axios
      .get(URL)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setUsersInfo(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const postNewUser = () => {
    axios
      .post(URL, {
        username: username,
        email: email,
        password: password,
        favoriteBooks: [],
        readBooks: []
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleRegisterButton = () => {
    if (username !== "" && email !== "" && password !== "") {
      const isExist = usersInfo.some((user) => user.username == username);
      if (isExist) {
        setAlertMsg("*The user is exist!");
      } else {
        postNewUser();
        navigate("/");
      }
    } else {
      setAlertMsg("*Please Fill the fields!");
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="hero w-full bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse w-[40%] max-sm:w-[80%]">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body w-full">
            <div>
              <p className="text-center text-4xl font-bold">Sign Up!</p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">username</span>
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="username"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">email</span>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button
                onClick={handleRegisterButton}
                className="btn bg-amber-900 text-white hover:text-black"
              >
                Sign Up
              </button>
            </div>
            <p className="text-center">
              Do you have an account?{" "}
              <Link to="/register">
                <span className="font-bold hover:underline text-amber-900">
                  Login{" "}
                </span>
              </Link>
            </p>
            {alertMsg && (
              <p className="font-bold text-sm text-red-900 text-center">
                {alertMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
