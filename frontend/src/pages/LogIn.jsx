import React, { useState, useEffect } from "react";
import "../comp_css/Login.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import loginbg from "../picture/background_image.webp";
import { jwtDecode } from "jwt-decode"; // Use named import


const bg = {
  backgroundImage: `url(${loginbg})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  border: "1px solid grey",
  height: "100vh",
};

const formData = {
  email: "",  // Change from username to email
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(formData);

  useEffect(() => {
    document.title = 'Ecommerse | LogIn';
    return () => {
      document.title = 'Ecommerse App';
    };
  }, []);

  const setHandlerChange = (e) => {
    const val = e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("email", form.email);
    params.append("password", form.password);

    try {
      /*const authHeader = `Basic ${btoa(`${form.email}:${form.password}`)}`;
      const response = await axios.get("http://localhost:8080/ecom/signIn", {
        headers: {
          Authorization: authHeader,
        },*/
      const response = await axios.post("http://localhost:8080/login", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },

      });


      if (response.headers.authorization) {
        const token = response.headers.authorization.split(" ")[1]; // Extract the JWT token
        const decodedToken = jwtDecode(token); // Decode the JWT

        const userRole = decodedToken.role; // Extract user_role from the token
        const userId = decodedToken.userId;
        const cartId = decodedToken.cartId;
        const name=decodedToken.firstName;

        /*alert(userId);
        alert(userRole);
        alert(name);*/


        if (userRole === 'ROLE_USER') {
          localStorage.setItem("jwtToken", response.headers.authorization);
          localStorage.setItem("name", name || "LogIn");
          localStorage.setItem("userid", userId);
          localStorage.setItem("cartid", cartId);

          console.log("JWT Token stored:", response.headers.authorization);
          alert("User Login successfully");


          navigate("/");
        } else {
          alert("Invalid Credential");
          navigate("/login"); // Redirect to the home page or user dashboard
        }

      } else {
        alert("Invalid Credential");
        console.error("JWT retrieval failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials. Please try again.");
      } else {
        alert("Error during login. Please try again later.");
        console.error("Error during login:", error);
      }
    }
  };

// Example of sending JWT in an authenticated request
  const fetchProtectedData = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      try {
        const response = await axios.get("http://localhost:8080/ecom/protected-endpoint", {
          headers: {
            Authorization: jwtToken,  // Include the JWT token in the Authorization header
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching protected data:", error);
      }
    } else {
      console.error("No JWT token found in localStorage");
    }
  };

  const { email, password } = form;

  return (
      <>
        <div style={bg}>
          <h2 style={{ textAlign: "center", color: "grey", margin: "20px" }}>
            WELCOME TO USER LOGIN PAGE
          </h2>
          <div className="loginConatiner">
            <div className="login-form">
              <h2 style={{ textAlign: "center" }}>LogIn </h2>
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>  {/* Change label to Email */}
                  <input
                      id="email"
                      type="text"
                      name="email"  // Change from username to email
                      value={email}
                      onChange={setHandlerChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label>Password:</label>
                  <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={setHandlerChange}
                  />
                </div>
                <div className="form-group">
                  <input type="submit" value="Login" />
                  <p>
                    Don't have an account?{" "}
                    <Link to="/register-user">Register here</Link>
                  </p>
                </div>
              </form>
              <p>
                <Link to="/">Turn back to main page</Link>
              </p>
            </div>
          </div>
        </div>
      </>
  );
};

export default Login;