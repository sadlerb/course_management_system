import "./Button.scss"

const Button = ({ type, text,onClickHandeler }) => {
    return (
        <button className={type || "default"} onClick={onClickHandeler} >{text}</button>

    )
}


export default Button;