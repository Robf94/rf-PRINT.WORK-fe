import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlbumsPage from "./pages/Top100Albums";
import AlbumDetail from "./pages/AlbumDetail";
import Nav from "./components/Nav";
import Coverflow from "./components/Coverflow";
import ScrollToTop from "./components/ScrollToTop";

// const queryClient = new QueryClient();

function App() {
  return (
    <>
      {/* <QueryClientProvider client={queryClient}> */}
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
      {/* </QueryClientProvider> */}
    </>
  );
}

export default App;
