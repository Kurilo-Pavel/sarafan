import "../styles/input.css";
import classNames from "classnames";
import React from "react";

type TextInputProps = {
  field: {
    name: string,
    value: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
  };
  error?: string;
  placeholder: string;
  id: string;
  className: string;
}

const TextInput = ({field, error, placeholder, id, className,text}: TextInputProps) => {
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