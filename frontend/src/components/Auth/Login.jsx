import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate(); // Using the useNavigate hook

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthorized(true);

      // Redirect based on the role. Adjust according to how your API responds.
      if (role === 'Admin') {
        navigate('/admin'); // Redirect to Admin page
      } else {
        navigate('/'); // Redirect to homepage or dashboard for other roles
      }

      // Optionally clear the form fields here if needed
      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      // Handle errors, for example, show a toast notification
      toast.error(error.response.data.message);
    }
  };

  // Redirect if already authorized
  if(isAuthorized){
    navigate('/');
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/loginlogo.png" alt="logo" />
            <h3>Login to your account</h3>
          </div>
          <form onSubmit={handleLogin}> {/* Update to use onSubmit */}
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Student">Student</option>
                  <option value="Admin">Admin</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="zk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit">
              Login
            </button>
            <Link to={"/register"}>Register Now</Link>
          </form>
          <p>Already have an account
            <br></br>
            <Link to="/forgot-password">Forgot Password</Link>
          </p>
        </div>
        <div className="banner">
          <img src="/login.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;
