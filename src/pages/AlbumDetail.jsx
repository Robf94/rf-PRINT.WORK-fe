import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { fetchAlbumById } from "../../utils/api";
import Loader from "../components/Loader";
import getLargerArtwork from "../../utils/getLargerArtwork";

function AlbumDetail() {
  const [album, setAlbum] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

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

  album.genres.map((genre) => {
    console.log(genre.name);
  });

  return (
    <>
      <img
        src={album.artworkUrl100}
        alt={`Album artwork for ${album.name}`}
        className="w-sm-full"
      />
      <section className="m-2 album-detail">
        <h1 className="text-h1">{album.name}</h1>
        <h2 className="text-h2">{album.artistName}</h2>
        <h3>Released: {dateFormat(album.releaseDate, "mmmm d, yyyy")}</h3>
        <a href={album.artistUrl}>View Artist on Apple Music</a>
        <a href={album.url}>View Album on Apple Music</a>
        <div className="genres">
          <h3 className="text-h3">Genres:</h3>
          {album.genres.map((genre) => (
            <h1>{genre.name}</h1>
          ))}
        </div>
      </section>
    </>
  );
}

export default AlbumDetail;
