function ExternalButton(props) {
  const { url, btnText } = props;
  return (
    <a
      href={url}
      target="blank"
      rel="noopener noreferrer"
    >
      <button className="btn rounded bg-secondary flex-1 border-none">{btnText}</button>
    </a>
  );
}

export default ExternalButton;
