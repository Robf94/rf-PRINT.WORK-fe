import { useState, useEffect } from "react";
import { fetchTop100Albums } from "../../utils/api";
import AlbumCard from "../components/AlbumCard";

function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  // const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchTop100Albums()
      .then(({ data }) => {
        const albums = data.albums;
        console.log(albums, "<<< albumsData");
        setAlbums(albums);
      })
      .catch((err) => {
        console.log(err, "<<< error");
        // setIsError(true)
      });
  }, []);

  // if (isError) {
  //   return <ErrorPage />
  // }

  // if (isLoading) {
  //   return <Loader />
  // }

  return (
    <>
      <h1>Top 100 Albums</h1>
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          albumId={album.id}
          album={album.name}
          artist={album.artistName}
          artwork={album.artworkUrl100}
        />
      ))}
    </>
  );
}

export default AlbumsPage;
