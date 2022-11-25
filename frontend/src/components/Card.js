import { CurrentUserContext } from "../context/CurrentUserContext.js";
import React from "react";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext).currentUser;

  // Определяем, являемся ли мы владельцем текущей карточки

  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  console.log(isOwn)

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? "" : "element__trash_hidden"
  }`;
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="element">
      <div className="element__container">
        <button
          type="button"
          name="trash-button"
          className={cardDeleteButtonClassName}
          onClick={handleCardDelete}
        ></button>
        <div
          className="element__image"
          style={{ backgroundImage: `url(${props.card.link})` }}
          onClick={handleClick}
        ></div>
      </div>
      <div className="element__info">
        <h3 className="element__title">{props.card.name}</h3>
        <div className="element__like-container">
          <button
            type="button"
            name="like"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
export default Card;
