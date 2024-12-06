import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { fetchAlbumById } from "../../utils/api";
import Loader from "../components/Loader";
import getLargerArtwork from "../../utils/getLargerArtwork";
import ExternalButton from "../components/ExternalLinkButton";
import { useUser } from "../context/UserContext";
import HeartButton from "../components/HeartButton";
import ErrorPage from "./ErrorPage";

function AlbumDetail() {
  const [album, setAlbum] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  const { user, toggleFavouriteAlbum } = useUser();
  const isFavourite = user.favouriteAlbums.includes(parseInt(album.id));

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
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="album-detail-container flex flex-col md:flex-row justify-center items-center md:h-screen p-5 gap-5 md:gap-10">
      <div className="album-artwork-container w-full md:w-1/2 md:max-w-[450px]">
        <img
          src={album.artworkUrl100}
          alt={`Album artwork for ${album.name}`}
          className="w-full md:max-w-[450px] h-full rounded-lg object-cover"
        />
      </div>
      <section className="album-card-container w-full md:w-1/2 md:max-w-[450px] p-5 md:p-10 lg:p-16 card bg-neutral shadow-xl rounded-lg flex flex-col justify-between">
        <div className="container mb-10">
          <h1 className="text-h1 font-bold">{album.name}</h1>
          <h2 className="text-h2">{album.artistName}</h2>
          <p className="mb-2">Released: {dateFormat(album.releaseDate, "dd mmmm yyyy")}</p>
          <div className="genres flex items-start gap-2">
            {album.genres.map((genre) =>
              genre.name !== "Music" ? (
                <span
                  key={genre.name}
                  className="badge-accent rounded p-1"
                >
                  {genre.name}
                </span>
              ) : null
            )}
          </div>
        </div>

        <div className="btn-container flex gap-2 justify-between items-center">
          {album.artistName !== "Various Artists" && (
            <ExternalButton
              url={album.artistUrl}
              btnText={"View Artist"}
            />
          )}
          <ExternalButton
            url={album.url}
            btnText={"View Album"}
          />
          <div className="flex h-full w-10 self-center">
            <HeartButton
              albumId={album.id}
              isActive={isFavourite}
              toggleFavourite={toggleFavouriteAlbum}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AlbumDetail;
