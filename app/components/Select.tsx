import "../styles/select.css";

type SelectProps = {
  arrayValue: { name: string, value: string }[];
  className: string;
  disabledValue?: string;
  setSort: (sort: string) => void;
}

const Select = ({arrayValue, disabledValue, className, setSort}: SelectProps) => {
  return     <select
      defaultValue={disabledValue}
      className={className}
      onChange={(e) => setSort(e.currentTarget.value)}
    >
      <option disabled>{disabledValue}</option>
      {arrayValue.map(value => <option key={value.value} value={value.value}>{value.name}</option>)}
    </select>
};

export default Select;