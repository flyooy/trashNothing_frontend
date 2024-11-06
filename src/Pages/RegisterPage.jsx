import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import avatar1 from '../assets/img/avatars_login-register/avatar1.png';
import avatar2 from '../assets/img/avatars_login-register/avatar2.png';
import avatar3 from '../assets/img/avatars_login-register/avatar3.png';
import avatar4 from '../assets/img/avatars_login-register/avatar4.png';
import avatar5 from '../assets/img/avatars_login-register/avatar5.png';
import punkt from '../assets/img/avatars_login-register/punkt.png';
import punkt_green from '../assets/img/avatars_login-register/punkt_green.png';
import './css/LoginPage.css';
import { useLocation } from 'react-router-dom';

export default function RegisterPage() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [orte, setOrt] = useState("");
  const [plz, setPLZ] = useState("");
  const [addressStrasse, setAdress] = useState("");
  const [handynummer, setHandynummer] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/register') {
      localStorage.clear();
    }
  }, [location]);

  function register() {
    const user = {
      email,
      password,
      name,
      orte,
      plz,
      addressStrasse,
      handynummer

    };

    fetch("http://localhost:8080/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || 'Registration failed');
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }


  function submitByEnter(e) {
    if (e.key === 'Enter') {
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
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => submitByEnter(e)}
          type="password"
          placeholder="Password"
          className="input_form"
          required
        />
        <input
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => submitByEnter(e)}
          type="text"
          placeholder="Name"
          className="input_form"
          required
        />
        <input
          onChange={(e) => setOrt(e.target.value)}
          onKeyDown={(e) => submitByEnter(e)}
          type="text"
          placeholder="Ort"
          className="input_form"
          required
        />
        <input
          onChange={(e) => setPLZ(e.target.value)}
          onKeyDown={(e) => submitByEnter(e)}
          type="text"
          placeholder="PLZ"
          className="input_form"
          required
        />
        <input
          onChange={(e) => setAdress(e.target.value)}
          onKeyDown={(e) => submitByEnter(e)}
          type="text"
          placeholder="Adress"
          className="input_form"
          required
        />
        <input
          onChange={(e) => setHandynummer(e.target.value)}
          onKeyDown={(e) => submitByEnter(e)}
          type="text"
          placeholder="Handynummer"
          className="input_form"
          required
        />

        <button onClick={register} className="button_form">Registration</button>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <a className="a_form" href="/login">Sie haben bereits ein Konto? Anmelden</a>
      </div>


      <img src={avatar1} alt="avatar1" className="avatar avatar1" />
      <img src={avatar2} alt="avatar2" className="avatar avatar2" />
      <img src={avatar3} alt="avatar3" className="avatar avatar3" />
      <img src={avatar4} alt="avatar4" className="avatar avatar4" />
      <img src={avatar5} alt="avatar5" className="avatar avatar5" />
      <img src={punkt} alt="punkt red" className="avatar punkt" />
      <img src={punkt_green} alt="punkt green" className="avatar  punkt_green" />
    </section>
  );
}
