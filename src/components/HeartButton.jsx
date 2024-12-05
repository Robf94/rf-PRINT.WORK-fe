import Heart from "react-heart";

function HeartButton(props) {
  const { albumId, isActive, toggleFavourite } = props;

  return (
    <Heart
      isActive={isActive}
      onClick={() => toggleFavourite(parseInt(albumId))}
      animationTrigger="both"
      inactiveColor="rgba(255,125,125,.75)"
      activeColor="#e019ae"
      animationDuration={0.1}
    />
  );
}

export default HeartButton;
