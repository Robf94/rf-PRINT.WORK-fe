import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlbumsPage from "./pages/Top100Albums";
import AlbumDetail from "./pages/AlbumDetail";
import Nav from "./components/Nav";
import ScrollToTop from "../utils/ScrollToTop";

function App() {
  return (
    <>
      <Nav />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/albums"
          element={<AlbumsPage />}
        />
        <Route
          path="/albums/:id"
          element={<AlbumDetail />}
        />
      </Routes>
    </>
  );
}

export default App;
