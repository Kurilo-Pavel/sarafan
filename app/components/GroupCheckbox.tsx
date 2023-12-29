"use client";

type GroupCheckboxProps = {
  field: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
  };
  setPoint: (item: string[]) => void;
  point:string[];
  list: string[];
  error: string;
  title: string;
}

const GroupCheckbox = ({field, list, error, title, setPoint,point}: GroupCheckboxProps) => {
  const setItem = (item)=>{
    if(item.checked){
      setPoint([...point,item.id])
    }else{
      setPoint(point.filter(value=>value!==item.id))
    }
  };

  return <div>
    <h3 className="addProduct_title">{title}</h3>
    <div className="addProduct_group">
      {list.map((item) =>
        <label key={item} htmlFor={item} className="addProduct_label">
          <input
            id={item}
            type="checkbox"
            className="addProduct_input"
            {...field}
            onChange={(e)=>setItem(e.target)}
          />
          {item}
        </label>
      )}
    </div>
    {error && <span className="error">{error}</span>}
  </div>
};

export default GroupCheckbox;