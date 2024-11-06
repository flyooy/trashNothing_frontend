import React, { useState, useEffect } from "react";
import "./css/AboutUs.css";
import Yan from "../assets/img/deploymers/Yan.jpg";
import Deng from "../assets/img/deploymers/Deng.jpg";
import Marcus from "../assets/img/deploymers/Marcus.jpg";
export default function AboutUs() { return (
    <div className="about-us">
      <h2>Our Team</h2>
      <div className="photo-container">
        <div className="team-member">
                <img src={Yan} alt="Yan Java Developer" className="profile-photo" />
                <h1 className="name">Yan Mukha</h1>
                <p className="role">Java Developer</p>
          <p className="location">Velbert</p>
        </div>
        <div className="team-member">
                <img src={Marcus} alt="Marcus Java Developer" className="profile-photo" />
                <h1 className="name">Marcus Slomka</h1>
          <p className="role">Java Developer</p>
          <p className="location">Berlin</p>
        </div>
        <div className="team-member">
                <img src={Deng} alt="Deng Java Developer" className="profile-photo" />
                <h1 className="name">Deng Ma</h1>
          <p className="role">Java Developer</p>
          <p className="location">Düsseldorf</p>
        </div>
      </div>
    </div>
);
}
