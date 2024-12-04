import { Link } from "react-router-dom";

function StandardButton(props) {
  const {link, btnText} = props
  return (
    <Link to={link} className="flex justify-center">
      <button className="btn rounded-full mb-2 bg-secondary border-none">
        <Link to={link}>{btnText}</Link>
      </button>
    </Link>
  );
}

export default StandardButton