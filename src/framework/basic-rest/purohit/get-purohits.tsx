import { useQuery } from '@tanstack/react-query';
import http from "@framework/utils/http";
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

export const fetchPurohits = async () => {
	const { data } = await http.get(API_ENDPOINTS.PUROHITS);
	return data;
};

export const usePurohitsQuery = () => {
	return useQuery({
		queryKey: [API_ENDPOINTS.PUROHITS],
		queryFn: fetchPurohits
	});
};
