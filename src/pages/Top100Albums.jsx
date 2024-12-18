import { useState, useEffect } from "react";
import { fetchAlbums } from "../../utils/api";
import AlbumCard from "../components/AlbumCard";
import SearchBar from "../components/SearchBar";
import LoadMoreButton from "../components/LoadMoreButton";
import normaliseString from "../../utils/normaliseString";

function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (searchInput.length !== 0) return;

    setIsLoading(true);
    setIsError(false);

    fetchAlbums(page, 20)
      .then(({ data }) => {
        if (data && data.albums) {
          setAlbums((prev) => [...prev, ...data.albums]);
          setHasMore(data.next ? true : false);
        } else {
          setHasMore(false);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [page, searchInput]);

  const loadMore = () => {
    if (hasMore && !isLoading) setPage((prev) => prev + 1);
  };

  if (isError) {
    return <p className="text-center">No albums found!</p>;
  }

  return (
    <>
      <div className="album-search-container bg-primary px-2 py-5 md:py-10 lg:px-44 2xl:px-96 flex flex-col justify-center items-center">
        <h1 className="text-h1 text-center text-white">iTunes Top 100 Albums</h1>
        <h2 className="text-h2 text-center text-white">Updated periodically</h2>
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setAlbums={setAlbums}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-2 m-2 md:my-10 lg:mx-44 2xl:mx-96">
        {albums
          .filter((album) => {
            const normalisedSearchQuery = normaliseString(searchInput);
            const normalisedAlbumName = normaliseString(album.name);
            const normalisedArtistName = normaliseString(album.artistName);
            return (
              searchInput.length === 0 ||
              normalisedAlbumName.includes(normalisedSearchQuery) ||
              normalisedArtistName.includes(normalisedSearchQuery)
            );
          })
          .map((album, index) => (
            <AlbumCard
              key={index}
              position={index + 1}
              albumId={album.id}
              album={album.name}
              artist={album.artistName}
              artwork={album.artworkUrl100}
            />
          ))}
      </div>
      {hasMore && searchInput.length === 0 && (
        <div className="text-center my-2">
          <LoadMoreButton
            onClick={loadMore}
            disabled={isLoading}
            btnText={isLoading ? "Loading..." : "Load More"}
          ></LoadMoreButton>
        </div>
      )}
    </>
  );
}

export default AlbumsPage;
