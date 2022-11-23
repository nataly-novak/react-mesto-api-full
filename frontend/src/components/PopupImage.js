function PopupImage(props) {
  const hiddenClass =
    Object.keys(props.card).length == 0 ? "popup_hidden" : "popup_visible";
  const className = `popup  ${hiddenClass} popup_image`;
  return (
    <div className={className}>
      <div className="popup__container popup__container-image ">
        <button
          type="button"
          name="close-button"
          className="popup__close-button "
          onClick={props.closeFunc}
        ></button>
        <div
          style={{ backgroundImage: `url(${props.card.link})` }}
          className="popup__image"
        ></div>
        <h4 className="popup__image-title">{props.card.name}</h4>
      </div>
    </div>
  );
}

export default PopupImage;
