import { Link } from "react-router-dom";

function AlbumCard(props) {
  const { albumId, album, artist } = props;
  console.log(props);
  return (
    <Link to={`albums/${albumId}`}>
      <article>
        <h1>{album}</h1>
        <h2>{artist}</h2>
      </article>
    </Link>
  );
}

export default AlbumCard