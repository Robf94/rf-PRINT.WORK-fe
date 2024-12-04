import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchTop100Albums } from "../../utils/api";
import AlbumCard from "../components/AlbumCard";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import normaliseString from "../../utils/normaliseString";

function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);

  // useInfiniteQuery({
  //   queryKey: ["albums"],
  //   queryFn: fetchTop100Albums,
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage, allPages) => {
  //     if (allPages.length < 10) {
  //       return allPages.length + 1;
  //     } else {
  //       return undefined;
  //     }
  //   },
  // });

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchTop100Albums()
      .then(({ data }) => {
        const albums = data.albums;
        console.log(albums, "<<< albumsData");
        setAlbums(albums);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err, "<<< error");
      });
  }, []);

  // if (isError) {
  //   return <ErrorPage />
  // }

  if (isLoading) {
    return <Loader />;
  }

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

  return (
    <>
      <div className="album-search-container py-5">
        <h1 className="text-h1 text-center text-white">iTunes Top 100 Albums</h1>
        <h2 className="text-h2 text-center text-white">Updated daily</h2>
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>
      {filteredAlbums.length === 0 ? (
        <p className="text-center">No albums found!</p>
      ) : (
        filteredAlbums.map((album, index) => (
          <AlbumCard
            key={album.id}
            position={index + 1}
            albumId={album.id}
            album={album.name}
            artist={album.artistName}
            artwork={album.artworkUrl100}
          />
        ))
      )}
    </>
  );
}

export default AlbumsPage;
