// import Loader from "../components/Loader";
import StandardButton from "../components/StandardButton";

function Home() {
  return (
    <>
      <h1>Welcome</h1>
      <StandardButton link={"/albums"} btnText={"View Top 100 Albums"} />
    </>
  );
}

export default Home;
