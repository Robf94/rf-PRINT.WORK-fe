function LoadMoreButton(props) {
  const { onClick, disabled, btnText } = props;
  return (
    <button
      className="btn rounded-full bg-secondary border-none text-white text-center"
      onClick={onClick}
      disabled={disabled}
    >
      {btnText}
    </button>
  );
}

export default LoadMoreButton;
