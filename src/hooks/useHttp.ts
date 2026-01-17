import { useCallback, useState } from "react";
import axios from "axios";
import { Axios } from "../config/Axios";

export const useHttp = <T>(url: string) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const refetch = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await Axios.get<{ user: T }>(url);
			setData(response.data.user);
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				setError(err.response?.data);
			} else {
				setError("Unexpected error");
			}
		} finally {
			setLoading(false);
		}
	}, [url]);

	return { data, loading, error, refetch };
};
