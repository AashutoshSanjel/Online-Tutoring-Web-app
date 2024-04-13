import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";


const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Tutors",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Subjects",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Students",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Teacher",
      icon: <FaUserPlus />,
    },
  ];

  const handleLoginClick = () => {
    window.location.href = "http://localhost:3000";
  };

  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>Find a Subject that</h1>
            <h1>you want to study</h1>
            <p>
              "At our online tutoring platform, we believe in the power of education to transform lives. Our mission is to provide a dynamic and accessible learning environment where students can thrive, regardless of their location or background."
            </p>
            <p>
              "We Have our Hamro Shiksya Meet. Login to Hamro Shiksya."
            </p>
            <button onClick={handleLoginClick} className="loginButton">
              Login To Hamro Shiksya Meet
            </button>
          </div>
          <div className="image">
            <img src="/tut.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
