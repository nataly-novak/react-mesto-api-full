function PopupWithForm(props) {
  const hiddenClass = props.isHidden ? "popup_hidden" : "popup_visible";
  const className = `popup ${hiddenClass} popup_${props.name}`;
  return (
    <div className={className}>
      <div className="popup__container">
        <button
          type="button"
          name="close-button"
          className="popup__close-button"
          onClick={props.closeFunc}
        ></button>
        <form
          className="popup__form "
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
        >
          <h2 className="popup__title">{props.title}</h2>
          <div className="popup__group">{props.children}</div>
          <button
            type="submit"
            name="save-button"
            className="popup__save-button"
            noValidate
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
