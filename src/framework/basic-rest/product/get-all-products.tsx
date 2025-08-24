import { QueryOptionsType } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
	const { data } = await http.get(API_ENDPOINTS.PRODUCTS);
	return data as any;
};

const useProductsQuery = (options: QueryOptionsType) => {
	return useInfiniteQuery<any, Error>({
		queryKey: [API_ENDPOINTS.PRODUCTS, options],
		queryFn: fetchProducts,
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
