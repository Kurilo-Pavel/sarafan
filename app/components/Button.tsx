import "../styles/button.css";

type ButtonProps = {
  text: string;
  className: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
}
const Button = ({text, className, onClick, type, disabled}: ButtonProps) => {
  return <button type={type} className={className} onClick={onClick} disabled={disabled}>{text}</button>
}
export default Button;