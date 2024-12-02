function Loader() {
  return (
    <div className="flex justify-center content-center h-svh loading-container">
      {/* <progress
        className="progress w-56"
        value={0}
        max="100"
      ></progress> */}
      <span className="loading loading-dots loading-lg" />
    </div>
  );
}

export default Loader;
