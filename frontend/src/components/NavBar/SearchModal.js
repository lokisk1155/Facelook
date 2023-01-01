import { useEffect } from "react";
import SearchBar from "./SearchBar";
import "./SearchModal.css";
import { useState } from "react";

function SearchModal({ closeModal, typed, setTyped }) {
  const [userFilteredCount, setFilteredUserCount] = useState(0);

  let adjustedHeightForContainer;

  useEffect(() => {
    const userFilteredCountTimesHeight = userFilteredCount * 50 + 115;
    adjustedHeightForContainer = `${userFilteredCountTimesHeight}px`;
  }, [userFilteredCount]);

  useEffect(() => {}, [userFilteredCount]);
  return (
    <div
      className="search-modal-container"
      style={{ height: adjustedHeightForContainer }}
    >
      <SearchBar
        setDiv={setFilteredUserCount}
        typed={typed}
        setTyped={setTyped}
        autoFocus={false}
        closeModal={closeModal}
      />
    </div>
  );
}

export default SearchModal;
