import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar1 from "../assets/img/avatars_login-register/avatar1.png";
import avatar2 from "../assets/img/avatars_login-register/avatar2.png";
import avatar3 from "../assets/img/avatars_login-register/avatar3.png";
import avatar4 from "../assets/img/avatars_login-register/avatar4.png";
import avatar5 from "../assets/img/avatars_login-register/avatar5.png";
import punkt from "../assets/img/avatars_login-register/punkt.png";
import punkt_green from "../assets/img/avatars_login-register/punkt_green.png";
import "./css/LoginPage.css";
import { useLocation } from "react-router-dom";

export default function LoginPage() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/login") {
      localStorage.clear();
    }
  }, [location]);
  function login() {
    const auth = {
      email,
      password,
    };
    const encoded = btoa(`${email}:${password}`);
    console.log("Encoded credentials: ", encoded);

    fetch("http://localhost:8080/api/v1/auth/signin", {
      method: "POST",
      headers: {
        Authorization: "Basic " + encoded,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Invalid email or password.");
          } else {
            throw new Error("Failed to sign in. Please try again.");
          }
        }
        return response.json();
      })
      .then((data) => {
        console.log("Auth response data:", data);

        localStorage.setItem("benutzerId", data.benutzerId);
        localStorage.setItem("token", data.token);
        navigate("/marktplatz");
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage(error.message);
      });
  }

  function submitByEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      login();
    }
  }

  return (
    <section className="background_section">
      <h1 className="main_heading_login">Registriere Dich & nimm Teil</h1>

      <div className="login_form">
        <h2 className="login_h">Mit Email anmelden</h2>

        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          className="input_form"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => submitByEnter(e)}
          type="password"
          placeholder="Password"
          className="input_form"
        />

        <button onClick={login} className="button_form">
          Login
        </button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <a className="a_form" href="/registration">
          Sie haben noch kein Konto? Sign up
        </a>
      </div>

      <img src={avatar1} alt="avatar1" className="avatar avatar1" />
      <img src={avatar2} alt="avatar2" className="avatar avatar2" />
      <img src={avatar3} alt="avatar3" className="avatar avatar3" />
      <img src={avatar4} alt="avatar4" className="avatar avatar4" />
      <img src={avatar5} alt="avatar5" className="avatar avatar5" />
      <img src={punkt} alt="punkt red" className="avatar punkt" />
      <img
        src={punkt_green}
        alt="punkt green"
        className="avatar  punkt_green"
      />
    </section>
  );
}
