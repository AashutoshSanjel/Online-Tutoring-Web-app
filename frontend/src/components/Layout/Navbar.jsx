import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import { GiHamburgerMenu } from "react-icons/gi"

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/logout", { withCredentials: true });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  }

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/logohamro.png" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          {user && user.role !== "Admin" && (
            <>
              <li>
                <Link to={"/"} onClick={() => setShow(false)}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to={"/job/getall"} onClick={() => setShow(false)}>
                  ALL SUBJECTS
                </Link>
              </li>
              {user.role === "Teacher" && (
                <>
                  <li>
                    <Link to={"/applications/me"} onClick={() => setShow(false)}>
                      STUDENT REQUESTS
                    </Link>
                  </li>
                  <li>
                    <Link to={"/job/post"} onClick={() => setShow(false)}>
                      POST NEW SUBJECT
                    </Link>
                  </li>
                  <li>
                    <Link to={"/job/me"} onClick={() => setShow(false)}>
                      VIEW YOUR SUBJECT
                    </Link>
                  </li>
                </>
              )}
              {user.role === "Student" && (
                <li>
                  <Link to={"/applications/me"} onClick={() => setShow(false)}>
                    MY REQUESTS
                  </Link>
                </li>
              )}
            </>
          )}
          {/* Logout button displayed for all roles but outside the conditional rendering block for admin role */}
          <li>
            <button onClick={handleLogout}>LOGOUT</button>
          </li>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
