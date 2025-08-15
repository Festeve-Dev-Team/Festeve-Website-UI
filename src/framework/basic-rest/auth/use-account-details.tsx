import { useQuery } from '@tanstack/react-query';
import http from "@framework/utils/http";
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

const fetchAccountDetails = async () => {
    const { data } = await http.get(API_ENDPOINTS.USERS_ME);
    return data;
};

export const useAccountDetailsQuery = () => {
    return useQuery({
        queryKey: [API_ENDPOINTS.USERS_ME],
        queryFn: fetchAccountDetails,
    });
};
