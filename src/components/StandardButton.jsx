import { Link } from "react-router-dom";

function StandardButton(props) {
  const { link, btnText } = props;
  return (
    <Link
      to={link}
      className="flex justify-center"
    >
      <button className="btn rounded mb-2 md:my-10 bg-secondary text-white border-none">
        {btnText}
      </button>
    </Link>
  );
}

export default StandardButton;
