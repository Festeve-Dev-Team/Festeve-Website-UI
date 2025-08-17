import { Product } from "@framework/types";

export const getAllProductImages = (product?: Product | null): string[] => {
  if (!product || !Array.isArray(product.variants)) return [];
  
  // Get unique images from all variants
  const allImages = product.variants.reduce((acc: string[], variant) => {
    if (variant && Array.isArray(variant.images) && variant.images.length > 0) {
      return [...acc, ...variant.images];
    }
    return acc;
  }, []);

  // Remove duplicates
  return Array.from(new Set(allImages));
};
