// import Loader from "../components/Loader";
import StandardButton from "../components/StandardButton";
import Coverflow from "../components/Coverflow";

function Home() {
  return (
    <>
      <h1>Welcome</h1>
      <Coverflow />
      <StandardButton
        link={"/albums"}
        btnText={"View Top 100 Albums"}
      />
    </>
  );
}

export default Home;
