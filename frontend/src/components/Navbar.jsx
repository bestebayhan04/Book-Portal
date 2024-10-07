import React from "react";
import { useNavigate } from "react-router-dom";
import "../comp_css/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const iconstyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    };
    const navigate = useNavigate();

    const userId = localStorage.getItem("userid");
    const name = localStorage.getItem("name");

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleLogoutClick = () => {
        localStorage.removeItem("userid");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("cartid");
        localStorage.removeItem("name");

        alert("User Logout Successfully.....");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <h3
                    onClick={() => {
                        navigate("/");
                    }}
                    style={{ cursor: "pointer" }}
                >
                    E-M@RKET
                </h3>
            </div>

            <div className="iconbutton">
                {/* Thumbs Down Icon */}
                <div
                    style={{ ...iconstyle, cursor: "pointer" }}
                    onClick={() => {
                        navigate("/user/blacklist");
                    }}
                    className="blacklist-button"
                >
                    <FontAwesomeIcon icon={faThumbsDown} className="thumbs-down-icon" />
                    <p style={{ margin: "4px" }}>Blacklist</p>
                </div>

                {/* Fav Icon */}
                <div
                    style={{ ...iconstyle, cursor: "pointer", marginLeft: "10px" }} /* Adjusted marginLeft */
                    onClick={() => {
                        navigate("/user/cart");
                    }}
                    className="cart-button"
                >
                    <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                    <p style={{ margin: "4px" }}>Fav</p>
                </div>

                {userId ? (
                    <>

                        <div onClick={handleLogoutClick} style={{ cursor: "pointer", marginLeft: "10px" }}>
                            Logout
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            style={{ ...iconstyle, cursor: "pointer" }}
                            className="login-button"
                            onClick={handleLoginClick}
                        >
                            <FontAwesomeIcon icon={faUser} className="login-icon" />
                            <p style={{ margin: "4px" }}>Login</p>
                        </div>
                        <div
                            className="signin-button"
                            onClick={() => {
                                navigate("/register-user");
                            }}
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                        >
                            SignIn
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
