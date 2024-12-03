import axios from "axios";

const api = axios.create({
  baseURL: "https://rf-print-work-be.onrender.com/api",
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
  return api
    .get(`/albums`)
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("Error fetching albums");
    });
}