import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupImage from "./PopupImage.js";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import api from "../utils/Api.js";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoToolTip from "./InfoToolTip.js";
import ProtectedRoute from "./ProtectedRoute";
import { useParams, useHistory } from "react-router-dom";
import {authorize, register, getContent} from "../utils/Auth.js"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    true
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(true);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    true
  );
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(true);
  const [isTooltipPositive, setIsTooltipPositive] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [headerLink, setHeaderLink] = React.useState();
  const [userEmail, setUserEmail] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
    const apiPromises = [api.getUser(), api.getCards()];
    Promise.all(apiPromises)
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        console.log(currentUser)
        setCards([...initialCards]);
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

  function handleAuthorization( password, email){
    authorize(password, email)
    .then((res) =>{
      console.log(res)
      if (res){
        if (res.token){
          localStorage.setItem("jwt", res.token);
          handleLogin()
          setUserEmail(email)
          api.setToken(res.token)
          history.push("/")
        }
      }
      else{
        showNegativeTooltip()
      }
    }
  )
  .catch((err) => {
    showNegativeTooltip()
    console.log(err)
  })
  }

  function handleRegister( email,  password){
    register(password, email).then((res) => {
      if (res) {
        showPositiveTooltip();
        setUserEmail(email);
        history.push("/sign-in")
      } else {
        showNegativeTooltip();
      }
    })
    .catch((err) => {
      showNegativeTooltip()
      console.log(err)
    })
  }

  function tokenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит, действующий он или нет
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      api.setToken(jwt)
      getContent(jwt).then((data) => {
        console.log(data)
        setLoggedIn(true);
        history.push("/");
        setUserEmail(data.email);
      })
      .catch((err) => console.log(err));
    }
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .handleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id, c._id === card._id ? newCard : c))
        );
        //setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c != card));
      })
      .catch((err) => console.log(err));
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(false);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(false);
  }

  function showPositiveTooltip() {
    setIsTooltipOpen(false);
    setIsTooltipPositive(true);
  }
  function showNegativeTooltip() {
    setIsTooltipOpen(false);
    setIsTooltipPositive(false);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(true);
    setIsEditProfilePopupOpen(true);
    setIsAddPlacePopupOpen(true);
    setIsTooltipOpen(true);
    setSelectedCard({});
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserText({ name, about })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .setUserImage(avatar)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleLogin() {
    setLoggedIn(true);
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: currentUser,
        setHeaderLink: setHeaderLink,
        headerLink: headerLink,
        setUserEmail: setUserEmail,
        userEmail: userEmail,
      }}
    >
      <div className="body page">
        <Header />
        <Switch>
          <Route exact path="/sign-in">
            <Login
              authorize={handleAuthorization}
            />
          </Route>
          <Route exact path="/sign-up">
            <Register
              register={handleRegister}
            />
          </Route>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onClose={closeAllPopups}
            onCardClick={handleCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            cards={cards}
          />
        </Switch>
        <Footer />
        <EditProfilePopup
          isHidden={isEditProfilePopupOpen}
          closeFunc={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isOpen = {isEditProfilePopupOpen}
        />
        <AddPlacePopup
          isHidden={isAddPlacePopupOpen}
          closeFunc={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name="remove"
          title="Вы уверены?"
          isHidden="true"
          closeFunc={closeAllPopups}
        ></PopupWithForm>
        <EditAvatarPopup
          isHidden={isEditAvatarPopupOpen}
          closeFunc={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupImage card={selectedCard} closeFunc={closeAllPopups} />
        <InfoToolTip
          isPositive={isTooltipPositive}
          isHidden={isTooltipOpen}
          closeFunc={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
