import { CategoriesQueryOptionsType } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchCategories = async () => {
  const data = await http.get(API_ENDPOINTS.CATEGORIES);
  return data.data;
};

const fetchAncientCategories = async () => {
  const data = await http.get(API_ENDPOINTS.CATEGORIES_ANCIENT);
  return data.data;
};

export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<any, Error>({
    queryKey: [API_ENDPOINTS.CATEGORIES, options],
    queryFn:
      options.demoVariant === "ancient"
        ? fetchAncientCategories
        : fetchCategories,
  });
};
