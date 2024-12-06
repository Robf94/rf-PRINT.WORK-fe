import { useState, useEffect } from "react";
import StandardButton from "../components/StandardButton";
import Coverflow from "../components/Coverflow";
import { useUser } from "../context/UserContext";
import { fetchAlbums } from "../../utils/api";
import AlbumCard from "../components/AlbumCard";
import greeting from "../../utils/greeting";
import ErrorPage from "./ErrorPage";
import Loader from "../components/Loader";

function Home() {
  const [albums, setAlbums] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  const { user } = useUser();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true)
    fetchAlbums()
      .then(({ data }) => {
        const albums = data.albums;
        setAlbums(albums);
        setIsLoading(false)
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <ErrorPage />
  }

  return (
    <>
      <h1 className="text-h1 text-center px-2 py-10 md:pt-10 bg-base-200">
        {greeting()}, {user.name}!
      </h1>
      <Coverflow />
      <h1 className="text-h2 mt-10 md:my-10 text-center">Current Top {albums.length} Albums</h1>
      <div className="grid md:grid-cols-2 gap-2 my-2 mx-2 lg:mx-44 2xl:mx-96">
        {albums.length === 0 ? (
          <p className="text-center">No albums found!</p>
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
      </div>
      <div className="flex justify-center">
        <StandardButton
          link={"/albums"}
          btnText={"View Top 100 Albums"}
        />
      </div>
    </>
  );
}

export default Home;
