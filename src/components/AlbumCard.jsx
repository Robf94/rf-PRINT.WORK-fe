import { Link } from "react-router-dom";

function AlbumCard(props) {
  const { position, albumId, album, artist, artwork } = props;

  return (
    <article className="card bg-neutral shadow-xl overflow-hidden hover:bg-base-200 transition ease duration-50 album-card">
      <Link
        to={`/albums/${albumId}`}
        className="flex flex-row justify-between items-center"
      >
        <div className="flex items-center justify-center w-10 h-10 ml-5 rounded-full grow-0 shrink-0 album-card-digit bg-primary">
          <h3 className="text-white">{position}</h3>
        </div>

        <div className="text-wrapper flex-1 mx-5 my-2 overflow-scroll">
          <h3 className="text-h4 line-clamp-2 font-bold">{album}</h3>
          <p className="truncate">{artist}</p>
        </div>

        <img
          src={artwork}
          className="h-full"
        />
      </Link>
    </article>
  );
}

export default AlbumCard;
