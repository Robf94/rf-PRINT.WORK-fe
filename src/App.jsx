import { Routes, Route } from "react-router-dom";
import AlbumsPage from "./pages/Top100Albums";
import AlbumDetail from "./pages/AlbumDetail";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<AlbumsPage />}
      />
      <Route
        path="/albums/:id"
        element={<AlbumDetail />}
      />
    </Routes>
  );
}

export default App;
