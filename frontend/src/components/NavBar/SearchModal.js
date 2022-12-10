import SearchBar from "./SearchBar";
import "./SearchModal.css";

function SearchModal({ closeModal, typed, setTyped }) {
  return (
    <div className="search-modal-container">
      <SearchBar typed={typed} setTyped={setTyped} autoFocus={false} closeModal={closeModal} />
    </div>

  );
}

export default SearchModal;
