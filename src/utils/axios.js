import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3333/`
});

api.interceptors.response.use(
  (response) => response.data
);

export default api