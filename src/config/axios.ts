import axios from "axios";

export const BASE = "http://localhost:4002";

export const Axios = axios.create({
	baseURL: BASE,
});

Axios.interceptors.request.use(config => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `bearer ${token}`;
	}
	return config;
});
