import axios from "axios";

export const BASE = "http://localhost:4002";

export const Axios = axios.create({
	baseURL: BASE,
});

Axios.interceptors.request.use(config => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

Axios.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			localStorage.removeItem("token");
			window.location.href = "/";
		}
		return Promise.reject(error);
	}
);
