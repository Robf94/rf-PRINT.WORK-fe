import { Link } from "react-router-dom";

function StandardButton(props) {
  const {link, btnText} = props
  return (
    <Link to={link}>
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg rounded-full">
        <Link to={link}>{btnText}</Link>
      </button>
    </Link>
  );
}

export default StandardButton