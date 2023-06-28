import "./Button.scss"

const Button = ({ type, text }) => {
    return (
        <button className={type || "default"}>{text}</button>

    )
}


export default Button;