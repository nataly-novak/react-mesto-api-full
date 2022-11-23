import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext).currentUser;
  const avatarInputRef = React.useRef();
  React.useEffect(() => {
    avatarInputRef.current.value = "";
  }, [props.isHidden]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateAvatar(avatarInputRef.current.value);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isHidden={props.isHidden}
      closeFunc={props.closeFunc}
      onSubmit={handleSubmit}
      buttonText={"Сохранить"}
    >
      <input
        ref={avatarInputRef}
        name="link"
        type="url"
        id="avatar-link"
        className="popup__comment popup__input"
        placeholder="Ссылка на картинку"
        required
        noValidate
      />
      <span className="avatar-link-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
