import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Hamro Shiksya Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                As a user as a Student or a Tutor, Create your account.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find your Tutors/ Educate your Students
              </p>
              <p>
              Find Subjects you want to study and find tutors,
                As a Tutor you Post your Subject and Claim Student Requests,
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Find your Tutors/ Find Your Students</p>
              <p>
                Study and clear your doubts through Virtual Learning,
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
