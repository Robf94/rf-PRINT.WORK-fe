import { Link } from "react-router-dom";

function AlbumCard(props) {
  const { position, albumId, album, artist, artwork } = props;
  console.log(props);
  return (
    <article className="card bg-base-100 shadow-xl my-5 mx-2 max-w-lg overflow-hidden">
      <Link
        to={`/albums/${albumId}`}
        className="flex flex-row justify-between items-center"
      >
        <div className="prose flex items-center justify-center w-10 h-10 ml-5 rounded-full bg-indigo-500 grow-0 shrink-0">
          <h3 className="text-white">{position}</h3>
        </div>

        <div className="text-wrapper flex-1 mx-5 my-2 overflow-scroll">
          <h3 className="line-clamp-2">{album}</h3>
          <h4 className="truncate">{artist}</h4>
        </div>

        <img
          src={artwork}
          className="h-full m-0"
        />
      </Link>
    </article>
  );
}

export default AlbumCard;
