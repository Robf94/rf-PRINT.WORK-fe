// import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import StandardButton from "../components/StandardButton";
import Coverflow from "../components/Coverflow";
import { useUser } from "../context/UserContext";
import { fetchTop10Albums } from "../../utils/api";
import AlbumCard from "../components/AlbumCard";

function Home() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const user = useUser();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchTop10Albums()
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

  return (
    <>
      <div className="text-wrapper mx-2">
        <h1 className="text-h1">Welcome back, {user.name}!</h1>
        <p>Browse your favourite albums:</p>
      </div>
      <Coverflow />
      <h1 className="text-h2 text-center">Today's Top 10 Albums</h1>
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
