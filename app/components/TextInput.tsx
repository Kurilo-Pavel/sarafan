import "../styles/input.css";
import classNames from "classnames";
import React from "react";

type TextInputProps = {
  field?: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string,
  };
  error?: string;
  placeholder: string;
  id: string;
  className: string;
}

const TextInput = ({field, error, placeholder, id, className}: TextInputProps) => {
  return <label htmlFor={id} className="label">
    <input
      type="text"
      placeholder={placeholder}
      className={classNames(className, {"error_color": error})}
      id={id}
      {...field}
    />
    {error && <span className="error_color error">{error}</span>}
  </label>
};

export default TextInput;