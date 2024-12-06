function LoadMoreButton(props) {
  const { onClick, disabled, btnText } = props;
  return (
    <button
      className="btn rounded mb-2 md:mb-10 bg-secondary text-white border-none"
      onClick={onClick}
      disabled={disabled}
    >
      {btnText}
    </button>
  );
}

export default LoadMoreButton;
