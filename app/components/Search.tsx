import "../styles/search.css";

const Search = () => {
  return <div className="header_search">
    <img src="/magnifying_glass.svg" alt="Поиск" className="search_magnifying"/>
    <label>
      <input type="text" className="search_input" placeholder="Поиск"/>
    </label>
  </div>
};
export default Search