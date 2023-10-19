import { useEffect } from 'react';
import SearchBar from './SearchBar';
import './SearchModal.css';
import { useState } from 'react';

function SearchModal({ closeModal, typed, setTyped }) {
  const [userFilteredCount, setFilteredUserCount] = useState(0);

  const [adjustedHeightForContainer, setAdjustedHeightForContainer] =
    useState(null);
  useEffect(() => {
    if (userFilteredCount === 0) {
      setAdjustedHeightForContainer('50px');
    } else {
      const userFilteredCountTimesHeight = userFilteredCount * 50 + 115;
      setAdjustedHeightForContainer(`${userFilteredCountTimesHeight}px`);
    }
  }, [userFilteredCount]);

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
