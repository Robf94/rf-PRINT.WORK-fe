import Heart from "react-heart";

function HeartButton(props) {
  const { albumId, isActive, toggleFavourite } = props;

  return (
    <Heart
      isActive={isActive}
      onClick={() => toggleFavourite(parseInt(albumId))}
      animationTrigger="both"
      animationDuration={0.5}
    />
  );
}

export default HeartButton;
