"use client";

import { useState, useEffect } from "react";
import "./Marketing.css";
import { Menu, X } from 'lucide-react'
import { useRouter } from "next/navigation";

export default function Marketing() {

    const router = useRouter();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Update windowWidth when resizing
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);

        // Clean up listener on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [navOption, setNavOption] = useState([
        { name: "Home", isActive: true, link: "#" },
        { name: "Register as Partner", isActive: false, link: "https://partners.pehnawa.app/" },
        { name: "Contact us", isActive: false, link: "#" },
        { name: "Get Early Access", isActive: false, link: "#" },
    ]);

    const handleNav = (item) => {
        setNavOption((prev) =>
            prev.map((nav) =>
                nav.name === item.name
                    ? { ...nav, isActive: true }
                    : { ...nav, isActive: false }
            )
        );

        if (item.link && item.link !== "#") {
            window.open(item.link, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className="desktop">
            <div className="container">

                {/*-----------------------------------NAVBAR-----------------------------------*/}
                {windowWidth > 500 ? (
                    <div className="navbar">
                        {navOption.map((item) => (
                            <p
                                key={item.name}
                                onClick={() => handleNav(item)}
                                className={`nav-item ${item.isActive ? 'active' : ''}`}
                            >
                                {item.name}
                            </p>
                        ))}
                    </div>
                ) : (
                    <div className="toggle">
                        <div className="toggle-icon">{!isMenuOpen ? <Menu onClick={toggleMenu} /> : <X onClick={toggleMenu} />}</div>
                        {isMenuOpen ? (
                            <div className="navbar">
                                {navOption.map((item) => (
                                    <p
                                        key={item.name}
                                        onClick={() => handleNav(item)}
                                        className={`nav-item ${item.isActive ? 'active' : ''}`}
                                    >
                                        {item.name}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                )}


                <div className="container-content">
                    <p className="container-head">Welcome to Pehnawa</p>
                    <p className="container-tag">Skip the scroll, wear what <span>actually</span> suits you</p>
                    <button className="container-button">Get Early Access</button>
                </div>
            </div>

            <img className="" src="./section.svg" />

            <div className="text-div">
                <img className="text" src="./text.svg" />
            </div>

            <div className="features">
                <img src="./1-1.svg" />
                <img src="./2-2.svg" />
                <img src="./1-2.svg" />
                <img src="./2-1.svg" />
                <img src="./3-1.svg" />
                <img src="./3-2.svg" />
            </div>

            <div className="getaccess">
                <img className="accessbutton" src="./getaccess.svg" />

                <div className="accesscontent">
                    <div className="accesshead">Early Access Benefits</div>
                    <div className="access-grid">
                        <img className="acces-item1" src="./priorityaccess.svg" />
                        <img className="acces-item2" src="./FreeExpressShipping.svg" />
                        <img className="acces-item3" src="./ExclusiveEarly-AdopterBadge.svg" />
                        <img className="acces-item4" src="./Surpriseoffers.svg" />
                        <img className="acces-item5" src="./AccesstoPrivateSales.svg" />
                    </div>
                </div>

                <div className="footer">
                    <div className="social-media">
                        <p className="footer-head">FOLLOW US ON <span>INSTAGRAM</span></p>
                        <img className="instalogo" src="./instalogo.svg" />
                        <p className="footer-tag">To stay in the loop of new launches & offers</p>
                    </div>
                    <div className="form">
                        <p className="form-head">Get early access</p>
                        <input type="text" placeholder="Name" />
                        <input type="text" placeholder="City" />
                        <input type="text" placeholder="Phone Number" />
                        <input type="email" placeholder="Email" />
                        <p className="form-tag">163+ have already joined the waitlist.</p>
                        <button className="form-submit">Join now</button>
                    </div>
                </div>
                <div className="victory">
                    <img className="victory-logo" src="./victory.svg" />
                    <p className="rights">© 2025 Pehnawa.app All rights reserved.</p>
                </div>

            </div>
        </div>
    )
}

