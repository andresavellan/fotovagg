import React, { useState, useContext, useRef } from 'react'
import { FotovaggContext } from './../context/FotovaggContext';

function Search() {
  console.log('--SEARCH COMPONENT');
  const { newSearchTerm } = useContext(FotovaggContext);
  const [searching, setSearching] = useState('');
  const searchForm = useRef();

  const handleSearchInput = (e) => {
    setSearching(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searching !== '') {
      newSearchTerm(searching);
      setSearching('');
      searchForm.current.reset();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} ref={searchForm}>
        <input type="text" placeholder="Search photos..." onChange={handleSearchInput} />
        <button type="submit">Search</button>
      </form>
    </div >
  )
}

export default Search;
