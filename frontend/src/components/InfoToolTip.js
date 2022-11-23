import positive from "../images/tooltip-positive.svg"
import negative from "../images/tooltip-negative.svg"
function InfoToolTip(props) {
  const hiddenClass = props.isHidden ? "popup_hidden" : "popup_visible";
  const className = `popup  ${hiddenClass} popup_tooltip`;
  const tipImage = props.isPositive?positive :negative
  const tipLine = props.isPositive? "Вы успешно зарегистировались!":"Что-то пошло не так! Попробуйте ещё раз."
  const altLine = props.isPositive? "Успех":"Неудача"

  return (
    <div className={className}>
      <div className="popup__container popup__container-tooltip ">
        <button
          type="button"
          name="close-button"
          className="popup__close-button "
          onClick={props.closeFunc}
        ></button>
        <img
          src = {tipImage}
          alt = {altLine}
          className="popup__tooltip-image"
        />
        <p
          className="popup__tooltip-title"
        >{tipLine}</p>
      </div>
    </div>
  );
}

export default InfoToolTip;
