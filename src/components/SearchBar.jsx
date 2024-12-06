import { fetchAllAlbums } from "../../utils/api";

function SearchBar(props) {
  const { searchInput, setSearchInput, setAlbums } = props;

  const handleChange = (e) => {
    e.preventDefault();
    const searchQuery = e.target.value;
    setSearchInput(searchQuery);

    if (searchQuery.length > 0) {
      fetchAllAlbums(searchQuery).then(({ data }) => {
        const albums = data.albums;
        setAlbums(albums);
      });
    } else {
      setAlbums([]);
    }
  };

  return (
    <label className="input input-bordered flex items-center md:mt-10 sm:mx-auto rounded-full max-w-lg w-full">
      <input
        type="text"
        className="grow"
        placeholder="Search for an Album or Artist"
        onChange={handleChange}
        value={searchInput}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
}

export default SearchBar;
