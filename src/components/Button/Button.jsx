import "./Button.scss"

const Button = ({ type, text,onClickHandeler,disabled }) => {
    return (
        <button className={type || "default"} onClick={onClickHandeler} disabled={disabled}>{text}</button>

    )
}


export default Button;