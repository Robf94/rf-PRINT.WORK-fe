function SearchBar(props) {
  const { searchInput, setSearchInput } = props;

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSearchInput(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search"
      onChange={handleChange}
      value={searchInput}
    />
  );
}

export default SearchBar;
