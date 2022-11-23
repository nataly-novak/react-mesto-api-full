import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext).currentUser;
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  React.useEffect(() => {
    if (currentUser.name) {
      setName(currentUser.name);
    }
    if (currentUser.about) {
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="person"
      title="Редактировать профиль"
      isHidden={props.isHidden}
      closeFunc={props.closeFunc}
      onSubmit={handleSubmit}
      buttonText={"Сохранить"}
    >
      <input
        name="name"
        type="text"
        value={name}
        id="person-name"
        onChange={handleNameChange}
        className="popup__name popup__input"
        placeholder="Имя"
        required
        maxLength="40"
        minLength="2"
        noValidate
      />
      <span className="person-name-error popup__error"></span>
      <input
        name="job"
        type="text"
        value={description}
        id="person-comment"
        onChange={handleDescriptionChange}
        className="popup__comment popup__input"
        placeholder="Профессия"
        required
        maxLength="200"
        minLength="2"
        noValidate
      />
      <span className="person-comment-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
