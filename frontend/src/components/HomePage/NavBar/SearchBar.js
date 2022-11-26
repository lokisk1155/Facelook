import { Redirect } from "react-router-dom";
import "./SearchBar.css";
import { useHistory } from "react-router-dom";

function SearchBar() {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="    search-faceOok"
        className="search-box"
      ></input>
    </div>
  );
}

export default SearchBar;
