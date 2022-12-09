import SearchBar from "./SearchBar";
import "./SearchModal.css";

function SearchModal({ closeModal }) {
  return (
    <div className="search-modal-container">
      <SearchBar autoFocus={false} closeModal={closeModal} />
    </div>
  );
}

export default SearchModal;
