import { QueryOptionsType } from '@framework/types'
import http from '@framework/utils/http'
import { API_ENDPOINTS } from '@framework/utils/api-endpoints'
import { useQuery } from '@tanstack/react-query'

export const fetchProducts = async (options?: QueryOptionsType) => {
  let url = API_ENDPOINTS.PRODUCTS_2;

  // Add query parameters if provided
  if (options && Object.keys(options).length > 0) {
    const params = new URLSearchParams();
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.category) params.append('category', options.category);
    if (options.text) params.append('text', options.text);
    if (options.status) params.append('status', options.status);

    // Handle search query parameter - map 'q' to 'categoryFullSlug'
    if (options.categoryFullSlug) {
      params.append('categoryFullSlug', options.categoryFullSlug);
    }

    url += `?${params.toString()}`;
  }

  const { data } = await http.get(url);
  return data;
}

export const useProductsQuery = (options: QueryOptionsType) => {
  return useQuery({
    queryKey: [API_ENDPOINTS.PRODUCTS_2, options],
    queryFn: () => fetchProducts(options)
  })
}
