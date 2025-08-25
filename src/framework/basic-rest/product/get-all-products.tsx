import { QueryOptionsType } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchProducts = async (options?: QueryOptionsType) => {
	let url = API_ENDPOINTS.PRODUCTS;

	// Add query parameters if provided
	if (options && Object.keys(options).length > 0) {
		const params = new URLSearchParams();
		if (options.limit) params.append('limit', options.limit.toString());
		if (options.category) params.append('category', options.category);
		if (options.text) params.append('text', options.text);
		if (options.status) params.append('status', options.status);

		url += `?${params.toString()}`;
	}

	const { data } = await http.get(url);
	return data as any;
};

const useProductsQuery = (options: QueryOptionsType) => {
	return useInfiniteQuery<any, Error>({
		queryKey: [API_ENDPOINTS.PRODUCTS, options],
		queryFn: () => fetchProducts(options),
		initialPageParam: 0,
		getNextPageParam: ({ paginatorInfo }) => {
			// Check if nextPageUrl exists and has content before returning it
			return paginatorInfo?.nextPageUrl && paginatorInfo.nextPageUrl.length > 0
				? paginatorInfo.nextPageUrl
				: undefined;
		},
	});
};

export { useProductsQuery, fetchProducts };
