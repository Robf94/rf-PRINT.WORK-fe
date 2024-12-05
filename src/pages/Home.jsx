import { useState, useEffect } from "react";
import StandardButton from "../components/StandardButton";
import Coverflow from "../components/Coverflow";
import { useUser } from "../context/UserContext";
import { fetchAlbums } from "../../utils/api";
import AlbumCard from "../components/AlbumCard";
import greeting from "../../utils/greeting";

function Home() {
  const [albums, setAlbums] = useState([]);
  const [isError, setIsError] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    setIsError(false);
    fetchAlbums()
      .then(({ data }) => {
        const albums = data.albums;
        setAlbums(albums);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err, "<<< error");
      });
  }, []);

  return (
    <>
      <div className="text-wrapper mx-2">
        <h1 className="text-h1 text-center mb-10">
          {greeting()}, {user.name}!
        </h1>
      </div>
      <Coverflow />
      <h1 className="text-h2 mt-10 text-center">Today's Top 10 Albums</h1>
      <div className="card-container flex flex-col gap-2 m-2 max-w-lg">
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
      <StandardButton
        link={"/albums"}
        btnText={"View Top 100 Albums"}
      />
    </>
  );
}

export default Home;
