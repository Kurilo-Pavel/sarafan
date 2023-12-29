import "../styles/input.css";
import classNames from "classnames";

type EmailProps = {
  field: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string,
  };
  isEmail: boolean;
  error?: string;
  textError?: string;
}
const Email = ({
field, error
}: EmailProps): JSX.Element => {
  return <label htmlFor="email" className="label">
    <input
      type="email"
      placeholder="Введите E-mail"
      className={classNames("log_input", {"error_color": error})}
      id="email"
      {...field}
    />
    {error && <span className="error_color error">{error}</span>}
  </label>
};

export default Email;