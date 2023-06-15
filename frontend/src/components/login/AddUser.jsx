import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useApi from "../../services/useApi";

function AddUser({ refEmail, refPass, setShowCreateAccount }) {
  const api = useApi();

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;

  useEffect(() => {
    const result = PWD_REGEX.test(pass1);
    setValidPwd(result);
    const match = pass1 === pass2;
    setValidMatch(match);
  }, [pass1, pass2]);

  const handleSubmitAddUser = (e) => {
    e.preventDefault();

    const newUser = {
      pseudo,
      email,
      password: pass1,
    };

    api
      .post("/user", newUser)
      .then(() => {
        setShowCreateAccount(false);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const handleCancel = () => {
    setShowCreateAccount(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmitAddUser} className="loginForm">
        <label htmlFor="pseudo" className="loginLabel">
          Pseudo:
          <input
            type="text"
            className="inputLoginForm"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
        </label>
        <label htmlFor="login" className="loginLabel">
          Email:
          <input
            type="text"
            className="inputLoginForm"
            ref={refEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="loginLabel">
          Mot de passe:
          <input
            type="password"
            className="inputLoginForm"
            ref={refPass}
            value={pass1}
            onChange={(e) => setPass1(e.target.value)}
          />
        </label>
        <span className={validPwd || !pass1 ? "signup-hide" : "signup-invalid"}>
          Mot de passe invalide
        </span>
        <label htmlFor="confirm-password" className="loginLabel">
          Confirmer le mot de passe:
          <input
            type="password"
            className="inputLoginForm"
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
          />
        </label>
        <span
          className={validMatch || !pass2 ? "signup-hide" : "signup-invalid"}
        >
          Les mots de passes ne correspondent pas
        </span>
        <button type="submit">Créer un compte</button>
        <button type="button" onClick={handleCancel}>
          Annuler
        </button>
      </form>
    </div>
  );
}

AddUser.propTypes = {
  refEmail: PropTypes.func.isRequired,
  refPass: PropTypes.func.isRequired,
  setShowCreateAccount: PropTypes.func.isRequired,
};

export default AddUser;
