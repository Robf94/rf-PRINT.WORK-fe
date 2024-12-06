function ExternalButton(props) {
  const { url, btnText } = props;
  return (
    <button className="btn rounded bg-secondary flex-1 border-none">
      <a
        href={url}
        target="blank"
        rel="noopener noreferrer"
      >
        {btnText}
      </a>
    </button>
  );
}

export default ExternalButton;
