import { useState, useEffect } from "react";
import { fetchTop100Albums } from "../../utils/api";
import AlbumCard from "../components/AlbumCard";
import Loader from "../components/Loader";

function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchTop100Albums()
      .then(({ data }) => {
        const albums = data.albums;
        console.log(albums, "<<< albumsData");
        setAlbums(albums);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "<<< error");
        // setIsError(true)
      });
  }, []);

  // if (isError) {
  //   return <ErrorPage />
  // }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="text-center">iTunes Top 100 Albums</h1>
      {albums.map((album, index) => (
        <AlbumCard
          key={album.id}
          position={index + 1}
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
