import "../styles/input.css";
import classNames from "classnames";
import React from "react";

type EmailProps = {
  field: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string,
  };
  placeholder: string;
  className: string;
  error?: string;
  serverError?:string;
}
const Email = ({
  field, error, placeholder, className,serverError
}: EmailProps) => {
  return <label htmlFor="email" className="label">
    <input
      type="email"
      placeholder={placeholder}
      className={classNames(className, {"error_color": error})}
      id="email"
      {...field}
    />
    {(error||serverError) && <span className="error_color error">{error||serverError}</span>}
  </label>
};

export default Email;