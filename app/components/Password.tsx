"use client";
import "../styles/input.css";
import classNames from "classnames";
import {useState} from "react";

type PasswordProps = {
  field: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
  };
  placeholder: string;
  error?: string;
}

const Password = ({field, error, placeholder}: PasswordProps): JSX.Element => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const showPassword = (): void => {
    if (visiblePassword) {
      setVisiblePassword(false);
    } else {
      setVisiblePassword(true);
    }
  };

  return <label htmlFor="password" className="label">
    <input
      type={visiblePassword ? "text" : "password"}
      placeholder={placeholder}
      autoComplete="off"
      className={classNames("log_input", {"error_color": error})}
      id={field.name}
      {...field}
    />
    <img
      className="image-input"
      alt="eye"
      src={visiblePassword ? "open_eye.svg" : "close_eye.svg"}
      onClick={showPassword}
    />
    {error && <span className="error_color error">{error}</span>}
  </label>
};

export default Password;