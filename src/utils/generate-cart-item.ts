import isEmpty from "lodash/isEmpty";

import { Product, ProductVariant } from '@framework/types';

export function generateCartItem(item: Product, attributes: object) {
  // Get the default variant or first available variant
  const variant = item.variants?.find((v: ProductVariant) => v.isActive) || item.variants?.[0];
  
  if (!variant) {
    throw new Error('No valid variant found for the product');
  }

  // Calculate final price based on discount
  const finalPrice = variant.price - (variant.discountType === 'percentage' 
    ? (variant.price * (variant.discountValue || 0) / 100)
    : (variant.discountType === 'fixed' ? (variant.discountValue || 0) : 0));

  return {
    id: !isEmpty(attributes)
      ? `${item.id}.${Object.values(attributes).join(".")}`
      : item.id,
    name: item.name,
    image: variant.images[0] || '',
    price: finalPrice,
    originalPrice: variant.price,
    discountType: variant.discountType || item.defaultDiscountType,
    discountValue: variant.discountValue || item.defaultDiscountValue,
    attributes,
    sku: variant.sku,
    stock: variant.stock,
    specs: variant.specs
  };
}
