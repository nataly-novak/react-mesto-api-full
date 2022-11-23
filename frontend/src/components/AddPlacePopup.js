import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
function AddPlacePopup(props) {
  const currentUser = React.useContext(CurrentUserContext).currentUser;
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isHidden]);


  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isHidden={props.isHidden}
      closeFunc={props.closeFunc}
      onSubmit={handleSubmit}
      buttonText={"Создать"}
    >
      <input
        value={name}
        onChange={handleNameChange}
        name="title"
        type="text"
        id="place-name"
        className="popup__name popup__input"
        placeholder="Название"
        required
        maxLength="30"
        minLength="2"
        noValidate
      />
      <span className="place-name-error popup__error"></span>
      <input
        value={link}
        onChange={handleLinkChange}
        name="link"
        type="url"
        id="place-comment"
        className="popup__comment popup__input"
        placeholder="Ссылка на картинку"
        required
        noValidate
      />
      <span className="place-comment-error popup__error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
