import React, { useState } from "react";

export default function SearchBar({ onSearch, defaultValue = "" }) {
  const [val, setVal] = useState(defaultValue);

  const submit = (e) => {
    e.preventDefault();
    if (val.trim()) onSearch(val.trim());
  };

  return (
    <form className="searchbar" onSubmit={submit}>
      <input
        type="text"
        className="search-input"
        placeholder="Enter city (ex: Toronto)"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <button className="search-btn" type="submit">Search</button>
    </form>
  );
}
