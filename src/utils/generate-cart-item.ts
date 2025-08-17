import isEmpty from "lodash/isEmpty";

import { Product, ProductVariant } from '@framework/types';

export function generateCartItem(product: Product, selectedVariant: ProductVariant, attributes: object = {}) {
  if (!selectedVariant) {
    throw new Error('No valid variant selected for the product');
  }

  // Calculate final price based on discount
  const finalPrice = selectedVariant.price - (selectedVariant.discountType === 'percentage' 
    ? (selectedVariant.price * (selectedVariant.discountValue || 0) / 100)
    : (selectedVariant.discountType === 'fixed' ? (selectedVariant.discountValue || 0) : 0));

  return {
    id: !isEmpty(attributes)
      ? `${product._id}-${selectedVariant._id}-${Object.values(attributes).join(".")}`
      : `${product._id}-${selectedVariant._id}`,
    product_id: product._id,
    variant_id: selectedVariant._id,
    name: product.name,
    slug: product.slug,
    image: selectedVariant.images[0],
    price: finalPrice,
    variant: {
      _id: selectedVariant._id,
      sku: selectedVariant.sku,
      specs: selectedVariant.specs,
      size: selectedVariant.size,
      color: selectedVariant.color,
      colorCode: selectedVariant.colorCode,
      colorFamily: selectedVariant.colorFamily,
      material: selectedVariant.material,
      weight: selectedVariant.weight
    },
    attributes
  };
}
