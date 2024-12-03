import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchTop100Albums } from "../../utils/api";
import AlbumCard from "../components/AlbumCard";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";

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
      album.name.toLowerCase().includes(lowerCaseInput) ||
      album.artistName.toLowerCase().includes(lowerCaseInput)
    );
  });

  return (
    <>
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <h1 className="text-center">iTunes Top 100 Albums</h1>
      {filteredAlbums.length === 0 ? (
        <p>No albums found!</p>
      ) : (
        albums.map((album, index) => (
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
