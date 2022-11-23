import React from "react";
import { Link } from "react-router-dom";

function AuthForm(props) {
  const className = `authorisation authorisation_${props.type}`;
  function RegisterLink() {
    if (props.type === "register")
      return (
        <Link to="/sign-in" className="authorisation__link">
          Уже зарегистрированны? Войти.
        </Link>
      );
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.handleSubmit({
      email: props.email,
      password: props.password,
    });
  }
  function handleEmailChange(e) {
    props.setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    props.setPassword(e.target.value);
  }
  return (
    <div className={className}>
      <form
        className="authorisation__form "
        name={props.name}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="authorisation__header">{props.header}</h2>
        <div className="authorisation__group">
          <input
            name="email"
            type="email"
            value={props.email}
            id="email"
            onChange={handleEmailChange}
            className="authorisation__email authorisation__input"
            placeholder="Email"
            required
            maxLength="40"
            minLength="2"
            noValidate
          />
          <span className="authorisation-email-error authorisation__error"></span>
          <input
            name="password"
            type="password"
            value={props.password}
            id="password"
            onChange={handlePasswordChange}
            className="authorisation__password authorisation__input"
            placeholder="Пароль"
            required
            maxLength="200"
            minLength="2"
            noValidate
          />
          <span className="authorisation-password-error authorisation__error"></span>
        </div>
        <button
          type="submit"
          name="save-button"
          className="authorisation__save-button"
          noValidate
        >
          {props.buttonText}
        </button>
      </form>
      <RegisterLink />
    </div>
  );
}
export default AuthForm;
