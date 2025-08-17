import React, { useEffect, useState } from "react";
import Typed from "typed.js";
import profilePic from "./images/PROFILE.jpg";
import cv from "./images/RenderCV_EngineeringResumes_Theme (1).pdf"; // Make sure this path is correct
import InteractiveBackground from "./InteractiveBackground";
import "./portfolio.css"; // Assuming your CSS is here

const Portfolio = () => {
    const [showModal, setShowModal] = useState(false);  
    const [showContactInfo, setShowContactInfo] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);


    useEffect(() => {
        const typed = new Typed(".input", {
            strings: ["Frontend Developer", "Software Developer", "Web Developer"],
            typeSpeed: 70,
            backSpeed: 55,
            loop: true,
        });
        return () => typed.destroy();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.projects-dropdown')) {
                setIsProjectsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Handle scroll effect for header
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const showContact = () => {
        document.getElementById("contact-info").style.display = "block";
    };

    // Smooth scroll to top when Home is clicked
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <InteractiveBackground />
            <div className="Header">
                <div className="wrapper">
                    <header 
                        className={isScrolled ? 'scrolled' : ''}
                        style={{
                            background: isScrolled ? 'rgba(34, 34, 34, 0.95)' : 'transparent',
                            backdropFilter: isScrolled ? 'blur(10px)' : 'none',
                            boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.3)' : 'none',
                            transition: 'all 0.3s ease',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1000
                        }}
                    >
                        <div 
                            className="logo" 
                            onClick={scrollToTop}
                            style={{ cursor: "pointer" }}
                        >
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
                                <li>
                                    <a 
                                        href="#" 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToTop();
                                            setIsMenuOpen(false);
                                        }}
                                        style={{ color: "#e5e5e5", cursor: "pointer" }}
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowAboutModal(true);
                                            setIsMenuOpen(false);
                                        }}
                                        style={{ color: "#e5e5e5", cursor: "pointer" }}
                                    >
                                        About
                                    </a>
                                </li>
                                <li className="projects-dropdown">
                                    <a 
                                        href="#" 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsProjectsOpen(!isProjectsOpen);
                                        }}
                                        style={{ color: "#e5e5e5", cursor: "pointer" }}
                                    >
                                        Projects ▼
                                    </a>
                                    {isProjectsOpen && (
                                        <div className="dropdown-menu">
                                            <a href="https://github.com/rahul6123/our-portfolio" target="_blank" rel="noopener noreferrer">
                                                Portfolio Website
                                            </a>
                                            <a href="https://github.com/rahul6123" target="_blank" rel="noopener noreferrer">
                                                View All Projects
                                            </a>
                                            <a href="https://github.com/rahul6123?tab=repositories" target="_blank" rel="noopener noreferrer">
                                                GitHub Repositories
                                            </a>
                                        </div>
                                    )}
                                </li>
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
                            </div>

                            <div className="social">
                                {/* <a href=""><i className="fa-brands fa-facebook"></i></a> */}
                                <a href="https://www.linkedin.com/in/rahul-raj-85ab6731b"><i className="fa-brands fa-linkedin"></i></a>
                                <a href="https://github.com/rahul6123"><i className="fa-brands fa-github"></i></a>
                                <a href="https://www.google.com/search?q=google&oq=googl&gs_lcrp=EgZjaHJvbWUqEAgAEAAYgwEY4wIYsQMYgAQyEAgAEAAYgwEY4wIYsQMYgAQyEw"><i className="fa-brands fa-google"></i></a>
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

            {/* About Modal */}
            {showAboutModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0, left: 0,
                        width: "100vw", height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                        overflowY: "auto"
                    }}
                    onClick={() => setShowAboutModal(false)}
                >
                    <div
                        style={{
                            width: "90%",
                            maxWidth: "900px",
                            background: "linear-gradient(135deg, #222 0%, #333 100%)",
                            padding: "30px",
                            borderRadius: "15px",
                            position: "relative",
                            color: "#fff",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            border: "1px solid rgba(0, 124, 237, 0.3)"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowAboutModal(false)}
                            style={{
                                position: "absolute",
                                top: "15px",
                                right: "20px",
                                fontSize: "24px",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                color: "#007ced",
                                fontWeight: "bold"
                            }}
                        >
                            ✕
                        </button>
                        
                        <div style={{ marginBottom: "30px" }}>
                            <h2 style={{ 
                                color: "#007ced", 
                                fontSize: "2.5rem", 
                                marginBottom: "10px",
                                textAlign: "center"
                            }}>
                                About Me
                            </h2>
                            <div style={{
                                width: "60px",
                                height: "4px",
                                background: "linear-gradient(90deg, #007ced, #db14ba)",
                                margin: "0 auto 20px",
                                borderRadius: "2px"
                            }}></div>
                        </div>

                        {/* Education Section - First */}
                        <div style={{
                            background: "rgba(138, 43, 226, 0.1)",
                            padding: "25px",
                            borderRadius: "12px",
                            border: "1px solid rgba(138, 43, 226, 0.2)",
                            marginBottom: "30px"
                        }}>
                            <h3 style={{ color: "#8a2be2", marginBottom: "15px", fontSize: "1.4rem" }}>
                                � Education
                            </h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                                <div style={{
                                    background: "rgba(138, 43, 226, 0.2)",
                                    padding: "15px",
                                    borderRadius: "10px",
                                    border: "1px solid rgba(138, 43, 226, 0.3)"
                                }}>
                                    <h4 style={{ color: "#e5e5e5", fontSize: "1.1rem", marginBottom: "8px", fontWeight: "600" }}>
                                        Master of Computer Applications (MCA)
                                    </h4>
                                    <p style={{ color: "#8a2be2", fontSize: "0.95rem", margin: "0 0 5px 0", fontWeight: "500" }}>
                                        Lovely Professional University (LPU)
                                    </p>
                                    <p style={{ color: "#b8b8b8", fontSize: "0.85rem", margin: "0", display: "flex", alignItems: "center", gap: "5px" }}>
                                        <span>📍</span> Jalandhar, Punjab
                                    </p>
                                </div>
                                <div style={{
                                    background: "rgba(138, 43, 226, 0.2)",
                                    padding: "15px",
                                    borderRadius: "10px",
                                    border: "1px solid rgba(138, 43, 226, 0.3)"
                                }}>
                                    <h4 style={{ color: "#e5e5e5", fontSize: "1.1rem", marginBottom: "8px", fontWeight: "600" }}>
                                        Bachelor of Computer Applications (BCA)
                                    </h4>
                                    <p style={{ color: "#8a2be2", fontSize: "0.95rem", margin: "0 0 5px 0", fontWeight: "500" }}>
                                        Magadh University
                                    </p>
                                    <p style={{ color: "#b8b8b8", fontSize: "0.85rem", margin: "0", display: "flex", alignItems: "center", gap: "5px" }}>
                                        <span>📍</span> Bodh Gaya, Bihar
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style={{ 
                            display: "grid", 
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
                            gap: "20px",
                            marginBottom: "30px"
                        }}>
                            {/* Frontend Technologies */}
                            <div style={{
                                background: "rgba(0, 124, 237, 0.1)",
                                padding: "25px",
                                borderRadius: "12px",
                                border: "1px solid rgba(0, 124, 237, 0.2)"
                            }}>
                                <h3 style={{ color: "#007ced", marginBottom: "15px", fontSize: "1.4rem" }}>
                                    🎨 Frontend Technologies
                                </h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                    {["React", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Responsive Design"].map(skill => (
                                        <span key={skill} style={{
                                            background: "rgba(0, 124, 237, 0.2)",
                                            color: "#e5e5e5",
                                            padding: "6px 12px",
                                            borderRadius: "20px",
                                            fontSize: "0.9rem",
                                            border: "1px solid rgba(0, 124, 237, 0.3)"
                                        }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Tools & Development */}
                            <div style={{
                                background: "rgba(219, 20, 186, 0.1)",
                                padding: "25px",
                                borderRadius: "12px",
                                border: "1px solid rgba(219, 20, 186, 0.2)"
                            }}>
                                <h3 style={{ color: "#db14ba", marginBottom: "15px", fontSize: "1.4rem" }}>
                                    🛠️ Tools & Development
                                </h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                    {["Git", "GitHub", "VS Code", "Vite", "NPM", "Netlify", "WordPress"].map(tool => (
                                        <span key={tool} style={{
                                            background: "rgba(219, 20, 186, 0.2)",
                                            color: "#e5e5e5",
                                            padding: "6px 12px",
                                            borderRadius: "20px",
                                            fontSize: "0.9rem",
                                            border: "1px solid rgba(219, 20, 186, 0.3)"
                                        }}>
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Backend & Database */}
                            <div style={{
                                background: "rgba(255, 165, 0, 0.1)",
                                padding: "25px",
                                borderRadius: "12px",
                                border: "1px solid rgba(255, 165, 0, 0.2)"
                            }}>
                                <h3 style={{ color: "#ffa500", marginBottom: "15px", fontSize: "1.4rem" }}>
                                    🗄️ Backend & Database
                                </h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                    {["Java", "Node.js", "SQL", "MySQL"].map(backend => (
                                        <span key={backend} style={{
                                            background: "rgba(255, 165, 0, 0.2)",
                                            color: "#e5e5e5",
                                            padding: "6px 12px",
                                            borderRadius: "20px",
                                            fontSize: "0.9rem",
                                            border: "1px solid rgba(255, 165, 0, 0.3)"
                                        }}>
                                            {backend}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div style={{
                                background: "rgba(127, 255, 212, 0.1)",
                                padding: "25px",
                                borderRadius: "12px",
                                border: "1px solid rgba(127, 255, 212, 0.2)"
                            }}>
                                <h3 style={{ color: "#7fffd4", marginBottom: "15px", fontSize: "1.4rem" }}>
                                    📞 Contact Information
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                    <div style={{
                                        background: "rgba(127, 255, 212, 0.2)",
                                        color: "#e5e5e5",
                                        padding: "10px 15px",
                                        borderRadius: "8px",
                                        border: "1px solid rgba(127, 255, 212, 0.3)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}>
                                        <span style={{ fontSize: "1.2rem" }}>📱</span>
                                        <span style={{ fontSize: "1rem", fontWeight: "500" }}>+91 9523309570</span>
                                    </div>
                                    <div style={{
                                        background: "rgba(127, 255, 212, 0.2)",
                                        color: "#e5e5e5",
                                        padding: "10px 15px",
                                        borderRadius: "8px",
                                        border: "1px solid rgba(127, 255, 212, 0.3)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}>
                                        <span style={{ fontSize: "1.2rem" }}>💼</span>
                                        <span style={{ fontSize: "1rem", fontWeight: "500" }}>Available for Projects</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Description */}
                        <div style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            padding: "25px",
                            borderRadius: "12px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            marginBottom: "20px"
                        }}>
                            <h3 style={{ color: "#aquamarine", marginBottom: "15px", fontSize: "1.4rem" }}>
                                💡 My Journey
                            </h3>
                            <p style={{ 
                                lineHeight: "1.6", 
                                color: "#e5e5e5", 
                                fontSize: "1.1rem",
                                marginBottom: "15px"
                            }}>
                                I'm a passionate <strong style={{ color: "#007ced" }}>Frontend Developer</strong> with a focus on creating 
                                beautiful, responsive, and user-friendly web applications. I love turning ideas into interactive 
                                digital experiences using modern web technologies.
                            </p>
                            <p style={{ 
                                lineHeight: "1.6", 
                                color: "#e5e5e5", 
                                fontSize: "1.1rem",
                                marginBottom: "15px"
                            }}>
                                My expertise spans across <strong style={{ color: "#db14ba" }}>React development</strong>, responsive design, 
                                and creating seamless user interfaces. I have experience with both frontend and backend technologies, 
                                including <strong style={{ color: "#7fffd4" }}>Java</strong> for robust application development and 
                                <strong style={{ color: "#7fffd4" }}>SQL</strong> for efficient database management.
                            </p>
                            <p style={{ 
                                lineHeight: "1.6", 
                                color: "#e5e5e5", 
                                fontSize: "1.1rem"
                            }}>
                                I also work with <strong style={{ color: "#db14ba" }}>WordPress</strong> for content management solutions 
                                and have a strong foundation in creating custom themes and plugins. I'm always eager to learn new 
                                technologies and take on challenging projects that push the boundaries of web development.
                            </p>
                        </div>

                        {/* Current Focus */}
                        <div style={{
                            background: "linear-gradient(135deg, rgba(0, 124, 237, 0.1), rgba(219, 20, 186, 0.1))",
                            padding: "20px",
                            borderRadius: "12px",
                            border: "1px solid rgba(0, 124, 237, 0.2)",
                            textAlign: "center"
                        }}>
                            <h4 style={{ color: "#007ced", marginBottom: "15px", fontSize: "1.2rem" }}>
                                🚀 Currently Exploring
                            </h4>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                                {["Advanced React Patterns", "Spring Boot", "MySQL Optimization", "Modern CSS Grid", "Interactive Animations", "Full-Stack Development"].map(item => (
                                    <span key={item} style={{
                                        background: "rgba(0, 124, 237, 0.2)",
                                        color: "#e5e5e5",
                                        padding: "6px 12px",
                                        borderRadius: "15px",
                                        fontSize: "0.9rem",
                                        border: "1px solid rgba(0, 124, 237, 0.3)"
                                    }}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Portfolio;
