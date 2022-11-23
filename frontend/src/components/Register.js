import React from "react";
import AuthForm from "./AuthForm.js";
import { useParams, useHistory, Link } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Register(props) {
  const setHeaderLink = React.useContext(CurrentUserContext).setHeaderLink;
  const setUserEmail = React.useContext(CurrentUserContext).setUserEmail;
  function HeaderLink() {
    return (
      <Link to="/sign-in" className="header__link">
        Войти
      </Link>
    );
  }
  React.useEffect(() => {
    setHeaderLink(HeaderLink);
  }, []);
  const history = useHistory();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  function handleSubmit({ email, passsword }) {
    if (email == "" || password == "") return;
    setPassword("")
    setEmail("")
    props.register(email, password)

  }
  return (
    <AuthForm
      handleSubmit={handleSubmit}
      header="Регистрация"
      type="register"
      buttonText="Зарегистрироваться"
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
}
export default Register;
