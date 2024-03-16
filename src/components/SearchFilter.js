import React from 'react'

const SearchFilter = ({setSearchText}) => {
  return (
    <div>
       <input
          onChange={(e) => setSearchText(e.target.value)}
          className="border-b border-[gray] p-1"
          type="text"
          placeholder="Name"
        />
    </div>
  )
}

export default SearchFilter
