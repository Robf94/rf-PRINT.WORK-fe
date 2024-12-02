import { Link } from "react-router-dom";

function AlbumCard(props) {
  const { albumId, album, artist, artwork } = props;
  return (
    <Link to={`albums/${albumId}`}>
      <article>
        <h1>{album}</h1>
        <h2>{artist}</h2>
        <img src={artwork} />
      </article>
    </Link>
  );
}

export default AlbumCard;
