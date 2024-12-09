import axios from 'axios'


const authAPi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
});

authAPi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})

export { authAPi }
