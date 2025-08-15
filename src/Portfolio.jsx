import React, { useEffect, useState } from "react";
import Typed from "typed.js";
import profilePic from "./images/PROFILE.jpg";
import cv from "./images/RenderCV_EngineeringResumes_Theme (1).pdf"; // Make sure this path is correct
import "./portfolio.css"; // Assuming your CSS is here

const Portfolio = () => {
    const [showModal, setShowModal] = useState(false);
    const [showContactInfo, setShowContactInfo] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    useEffect(() => {
        const typed = new Typed(".input", {
            strings: ["Frontend Developer", "Software Developer", "Web Developer"],
            typeSpeed: 70,
            backSpeed: 55,
            loop: true,
        });
        return () => typed.destroy();
    }, []);

    const showContact = () => {
        document.getElementById("contact-info").style.display = "block";
    };

    return (
        <>
            <div className="Header">
                <div className="wrapper">
                    <header>
                        <div className="logo">
                            <r className="fa-solid fa-r"></r>
                            <div className="logo-text">Rahul Raj</div>
                        </div>
                        <nav>
                            <div className="togglebtn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <ul className={`navlinks ${isMenuOpen ? 'open' : ''}`}>
                                <li><a href="#" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                                <li><a href="#" onClick={() => setIsMenuOpen(false)}>About</a></li>
                                <li>
                                    <a
                                        onClick={() => {
                                            setShowModal(true);
                                            setIsMenuOpen(false);
                                        }}
                                        className="btn active"
                                        style={{ background: "transparent", border: "none", color: "#e5e5e5", cursor: "pointer" }}
                                    >
                                        Resume
                                    </a>
                                </li>
                                {/* <li><a href="#" onClick={() => setIsMenuOpen(false)}>Contact</a></li> */}
                            </ul>
                        </nav>
                    </header>

                    <div className="container">
                        <div className="hero-pic">
                            <img src={profilePic} alt="Something went wrong 😉" />
                        </div>
                        <div className="hero-text">
                            <h5>
                                Hi I'm <span className="input">Frontend Developer</span>
                            </h5>
                            <h1>Rahul Raj</h1>
                            <br /><hr /><br />
                            <p>
                                Highly motivated and passionate about creating responsive and
                                user-friendly web applications with a focus on performance and accessibility.
                            </p>

                            <div className="btn-group">
                                <a href={cv} className="btn active" download>
                                    Download CV
                                </a>
                                <button className="btn" onClick={() => setShowContactInfo(true)}>
                                    Contact
                                </button>

                            </div>

                            <div className="social">
                                {/* <a href=""><i className="fa-brands fa-facebook"></i></a> */}
                                <a href="https://www.linkedin.com/in/rahul-raj-85ab6731b"><i className="fa-brands fa-linkedin"></i></a>
                                <a href="https://www.google.com/search?q=google&oq=googl&gs_lcrp=EgZjaHJvbWUqEAgAEAAYgwEY4wIYsQMYgAQyEAgAEAAYgwEY4wIYsQMYgAQyEw"><i className="fa-brands fa-google"></i></a>
                                <a href="https://www.instagram.com/"><i className="fa-brands fa-instagram"></i></a>
                            </div>




                        </div>
                    </div>
                </div>
            </div>

            {/* Resume Modal */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0, left: 0,
                        width: "100vw", height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999
                    }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        style={{
                            width: "90%",
                            maxWidth: "800px",
                            background: "#fff",
                            padding: "20px",
                            borderRadius: "10px",
                            position: "relative"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "15px",
                                fontSize: "18px",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            ❌
                        </button>
                        <h2 style={{ marginBottom: "10px" }}>My Resume</h2>
                        <embed
                            src={cv}
                            type="application/pdf"
                            width="100%"
                            height="500px"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Portfolio;
