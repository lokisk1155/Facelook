import { useEffect } from "react";
import SearchBar from "./SearchBar";
import "./SearchModal.css";
import { useState } from "react";

function SearchModal({ closeModal, typed, setTyped }) {

  const [userFilteredCount, setFilteredUserCount] = useState(0)

  const userFilteredCountTimesHeight = (userFilteredCount) * 50 + 115

  const adjustedHeightForContainer = `${userFilteredCountTimesHeight}px`

  useEffect(() => {

  }, [userFilteredCount])


  console.log(adjustedHeightForContainer)
  return (
    <div className="search-modal-container" style={{ height: adjustedHeightForContainer }}>
      <SearchBar
        setFilteredUserCount={setFilteredUserCount}
        typed={typed}
        setTyped={setTyped}
        autoFocus={false}
        closeModal={closeModal}
      />
    </div>
  );
}

export default SearchModal;
