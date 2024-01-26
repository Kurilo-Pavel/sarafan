import "@/app/styles/inputRadio.css";
import React from "react";

type InputRadioProps = {
  field: {
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
  };
  data: { point: string, value?: string, choice?: number | string }[];
  title: string;
  error?: string;
}

const InputRadio = ({field, data, title, error}: InputRadioProps) => {

  return <div className="checkout_data">
    <h3 className="data_title">{title}</h3>
    {data.map((value, index) =>
      <div key={index} className="data_field">
        <label className="data_label">
          <input
            {...field}
            type="radio"
            className="data_checkbox"
            value={value.choice}
          />
          {value.point}
        </label>
        {value.value && <span className="data_cost">{value.value}</span>}
      </div>)}
    {(error) && <span className="error_color">{error}</span>}
  </div>
};
export default InputRadio;