import axios from "axios";

const api = axios.create({
  baseURL: "https://rf-print-work-be.onrender.com/api",
  timeout: 60000,
});

export function fetchAllAlbums() {
  return api.get("/albums")
}

export function fetchAlbums(page = 1, limit = 10) {
  return api.get(`/albums/paginated?page=${page}&limit=${limit}`);
}

export function fetchAlbumById(id) {
  return api.get(`/albums/${id}`).then(({ data }) => {
    return data;
  });
}
