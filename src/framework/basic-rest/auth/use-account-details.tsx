import { useQuery } from '@tanstack/react-query';
import http from "@framework/utils/http";
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useUI } from '@contexts/ui.context';

const fetchAccountDetails = async () => {
    const { data } = await http.get(API_ENDPOINTS.USERS_ME);
    return data;
};

export const useAccountDetailsQuery = () => {
    const { isAuthorized } = useUI();

    return useQuery({
        queryKey: [API_ENDPOINTS.USERS_ME],
        queryFn: fetchAccountDetails,
        enabled: isAuthorized, // Only fetch when user is authenticated
    });
};
