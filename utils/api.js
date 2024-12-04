import axios from "axios";

const api = axios.create({
  baseURL: "https://rf-print-work-be.onrender.com/api",
  timeout: 30000,
});

// export function fetchTop100Albums(pageParam = 1, limit = 10) {
//   return api.get(`/albums?_page=${pageParam}&_limit=${limit}`)
//     .then(({ response }) => {
//       return {
//         data: response.data,
//         currentPage: pageParam,
//         nextPage: response.data.length === limit ? pageParam + 1 : null
//       }
//     })
//     .catch((err) => {
//     console.log("Error fetching albums");
//   })
// }

export function fetchTop100Albums() {
  return api.get("/albums");
}

export function fetchTop10Albums() {
  return api.get("/albums?limit=10")
}

export function fetchAlbumById(id) {
  return api.get(`/albums/${id}`).then(({ data }) => {
    return data;
  });
}
