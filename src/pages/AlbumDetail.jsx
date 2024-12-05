import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { fetchAlbumById } from "../../utils/api";
import Loader from "../components/Loader";
import getLargerArtwork from "../../utils/getLargerArtwork";
import ExternalButton from "../components/ExternalLinkButton";
import { useUser } from "../context/UserContext";
import HeartButton from "../components/HeartButton";

function AlbumDetail() {
  const [album, setAlbum] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  const { user, toggleFavouriteAlbum } = useUser()
  const isFavourite = user.favouriteAlbums.includes(parseInt(album.id))

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

  return (
    <>
      <img
        src={album.artworkUrl100}
        alt={`Album artwork for ${album.name}`}
        className="w-sm-full"
      />
      <section className="m-2 p-3 card bg-neutral shadow-xl overflow-hidden">
        <h1 className="text-h1 font-bold">{album.name}</h1>
        <h2 className="text-h2">{album.artistName}</h2>
        <p className="mb-5">Released: {dateFormat(album.releaseDate, "mmmm d, yyyy")}</p>
        <div>
          <HeartButton
            albumId={album.id}
            isActive={isFavourite}
            toggleFavourite={toggleFavouriteAlbum}
          />
        </div>
        <div className="btn-container flex gap-2 mb-5 justify-between">
          {album.artistName !== "Various Artists" ? (
            <ExternalButton
              url={album.artistUrl}
              btnText={"View Artist on Apple Music"}
            />
          ) : undefined}

          <ExternalButton
            url={album.url}
            btnText={"View Album on Apple Music"}
          />
        </div>
        <div className="genres">
          <h3 className="text-h3">Genres:</h3>
          {album.genres.map((genre) =>
            genre.name !== "Music" ? (
              <span
                key={genre.id}
                className="badge-success rounded p-1"
              >
                {genre.name}
              </span>
            ) : (
              ""
            )
          )}
        </div>
      </section>
    </>
  );
}

export default AlbumDetail;
