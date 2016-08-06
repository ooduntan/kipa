import React from 'react';

const SearchField = ({searchEvent}) => {
  return(
    <div className='input-field custom-nav-bar'>
      <input
        id='search'
        placeholder='Search'
        type='search'
        onKeyPress={searchEvent}
        required/>
      <label for='search'><i className='material-icons'>search</i></label>
      <i className='material-icons'>close</i>
    </div>
  );
};

export default SearchField;
