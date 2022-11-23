import React from "react";
import api from "../utils/Api.js";
import Card from "./Card.js";
import edit from "../images/profile-edit-avatar.svg";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import { useParams, useHistory, Link } from "react-router-dom";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext).currentUser;
  const setHeaderLink = React.useContext(CurrentUserContext).setHeaderLink;
  const userEmail = React.useContext(CurrentUserContext).userEmail;
  const history = useHistory();
  function signOut() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  }

  function HeaderLink() {
    return (
      <div className="header__container">
        <p className="header__email">{userEmail}</p>
        <button className="header__button" onClick={signOut}>
          Выйти
        </button>
      </div>
    );
  }
  React.useEffect(() => {
    setHeaderLink(HeaderLink);
  }, []);
  return (
    <main>
      <section className="profile">
        <div className="profile__user">
          <div
            className="profile__avatar-container"
            onClick={props.onEditAvatar}
          >
            <div
              className="profile__avatar"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            ></div>
            <img
              src={edit}
              alt="иконка редактирования"
              className="profile__avatar-edit"
            />
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h2 className="profile__name">{currentUser.name}</h2>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              type="button"
              name="edit-button"
              className="profile__edit-button"
              onClick={props.onEditProfile}
            >
              {" "}
            </button>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          name="add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card, i) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.handleCardLike}
            onCardDelete={props.handleCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
