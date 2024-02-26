"use client";
import "../styles/checkbox.css";
import React, {useState} from "react";

type CheckboxProps = {
  field?: {
    name: string;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
  };
  text: string;
  error?: string;
}

const Checkbox = ({field, error,text}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  return <div className="wrapper_checkbox">
    <input
      type="checkbox"
      id="checkbox"
      className="registration_checkbox"
      onClick={() => setIsChecked(!isChecked)}
      {...field}
    />
    <label
      htmlFor="checkbox"
      className="registration_label"
    >
      {text}
    </label>
    {error && <span className="error_color error">{error}</span>}
  </div>
};

export default Checkbox;