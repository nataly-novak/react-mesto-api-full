import React from "react";
import AuthForm from "./AuthForm.js"
import { useParams, useHistory, Link} from 'react-router-dom';
import { CurrentUserContext } from "../context/CurrentUserContext.js";


function Login(props){
  const setHeaderLink = React.useContext(CurrentUserContext).setHeaderLink;
  const setUserEmail = React.useContext(CurrentUserContext).setUserEmail;
  function HeaderLink(){
    return(
      <Link to = "/sign-up" className = "header__link">Регистрация</Link>
    )
  }
  React.useEffect(() => {
    setHeaderLink(HeaderLink)
  }, []);
  const history = useHistory();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  function handleSubmit({email, passsword}) {
      if (email=="" || password == "")
        return
      props.authorize(password, email)

    }

  return(
      <AuthForm handleSubmit = {handleSubmit} header = "Вход" type = "login" buttonText = "Вход" email = {email} password = {password} setEmail = {setEmail} setPassword = {setPassword}/>
  )
}
export default Login
