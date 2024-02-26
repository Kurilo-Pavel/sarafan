import "../styles/search.css";
import {useTranslations} from "next-intl";

const Search = () => {
  const data = useTranslations("Input");

  return <div className="header_search large">
    <img src="/magnifying_glass.svg" alt={data("search")} className="search_magnifying"/>
    <label>
      <input type="text" className="search_input" placeholder={data("search")}/>
    </label>
  </div>
};
export default Search