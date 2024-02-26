import "../styles/select.css";

type SelectProps = {
  arrayValue: { name: string, value: string }[];
  className: string;
  disabledValue?: string;
  setSort: (sort: string) => void;
  select?: string;
}

const Select = ({arrayValue, disabledValue, className, setSort, select}: SelectProps) => {
  return <select
    defaultValue={disabledValue}
    className={className}
    onChange={(e) => setSort(e.currentTarget.value)}
  >
    {!select&& <option disabled>{disabledValue}</option>}
    {arrayValue.map(value => {
      if (select === value.value) {
        return <option key={value.value} value={value.value} defaultValue={select}>{value.name}</option>;
      } else {
        return <option key={value.value} value={value.value}>{value.name}</option>;
      }
    })}
  </select>
};

export default Select;