import { EventsQueryOptionsType, Event } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchEvents = async (options?: EventsQueryOptionsType): Promise<Event[]> => {
    let url = API_ENDPOINTS.EVENTS;

    // Add query parameters if provided
    if (options && Object.keys(options).length > 0) {
        const params = new URLSearchParams();
        if (options.limit) params.append('limit', options.limit.toString());
        if (options.region) params.append('region', options.region);
        if (options.startDate) params.append('startDate', options.startDate);
        if (options.endDate) params.append('endDate', options.endDate);

        url += `?${params.toString()}`;
    }

    const { data } = await http.get(url);
    return data as Event[];
};

export const useEventsQuery = (options?: EventsQueryOptionsType) => {
    return useQuery<Event[], Error>({
        queryKey: [API_ENDPOINTS.EVENTS, options],
        queryFn: () => fetchEvents(options),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });
};
