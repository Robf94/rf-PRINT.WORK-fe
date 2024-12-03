import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { fetchAlbumById } from "../../utils/api";
import Loader from "../components/Loader";

function AlbumDetail() {
  const [album, setAlbum] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [largeArtwork, setLargeArtwork] = useState(album.artworkUrl100);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const getLargerArtwork = (artworkUrl100) => {
      return artworkUrl100.replace("100x100", "600x600");
    };

    fetchAlbumById(id)
      .then((data) => {
        const album = data.album;
        const modifiedAlbum = {
          ...album,
          artworkUrl100: getLargerArtwork(album.artworkUrl100),
        };
        setAlbum(modifiedAlbum);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <img
        src={album.artworkUrl100}
        alt=""
        className="w-sm-full"
      />
      <div className="prose">
        <h1>{album.name}</h1>
        <h2>{album.artistName}</h2>
        <h3>Released: {dateFormat(album.releaseDate, "mmmm d, yyyy")}</h3>
      </div>
    </>
  );
}

export default AlbumDetail;
