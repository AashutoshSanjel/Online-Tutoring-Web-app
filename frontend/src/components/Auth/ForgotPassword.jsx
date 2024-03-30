import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setEmail("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <h3>Forgot Password</h3>
          </div>
          <form onSubmit={handleForgotPassword}>
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
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
