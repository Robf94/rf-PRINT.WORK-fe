import { useState, useEffect } from "react";
import { fetchAlbums } from "../../utils/api";
import AlbumCard from "../components/AlbumCard";
import SearchBar from "../components/SearchBar";
import normaliseString from "../../utils/normaliseString";
import LoadMoreButton from "../components/LoadMoreButton";

function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setAlbums([]);
      setPage(1);
      setHasMore(true);
    }
  }, [searchInput]);

  useEffect(() => {
    const fetchAlbumData = () => {
      setIsLoading(true);
      setIsError(false);
      fetchAlbums(page, 10)
        .then(({ data }) => {
          if (data && data.albums) {
            setAlbums((prevAlbums) => [...prevAlbums, ...data.albums]);
            if (data.albums.length < 10 || albums.length + data.albums.length >= 100) {
              setHasMore(false);
            }
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsError(true);
        });
    };

    fetchAlbumData();
  }, [page, searchInput]);

  const filteredAlbums = albums.filter((album) => {
    if (searchInput.trim() === "") {
      return true;
    }

    const lowerCaseInput = searchInput.toLowerCase();

    return (
      normaliseString(album.name).includes(lowerCaseInput) ||
      normaliseString(album.artistName).includes(lowerCaseInput)
    );
  });

  const loadMore = () => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isError) {
    return <p className="text-center">No albums found!</p>;
  }
  return (
    <>
      <div className="album-search-container bg-primary py-5">
        <h1 className="text-h1 text-center text-white">iTunes Top 100 Albums</h1>
        <h2 className="text-h2 text-center text-white">Updated daily</h2>
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setAlbums={setAlbums}
        />
      </div>
      <div className="card-container flex flex-col gap-2 m-2 max-w-lg">
        {filteredAlbums.map((album, index) => (
          <AlbumCard
            key={album.id}
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
