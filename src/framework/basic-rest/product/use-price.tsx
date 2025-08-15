import { useMemo } from "react";

export function formatPrice({
  amount,
  currencyCode,
  locale,
}: {
  amount: number;
  currencyCode: string;
  locale: string;
}) {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  });

  return formatCurrency.format(amount);
}

export function formatVariantPrice({
  amount,
  baseAmount,
  currencyCode,
  locale,
  discountType,
  discountValue,
}: {
  baseAmount: number;
  amount: number;
  currencyCode: string;
  locale: string;
  discountType?: string;
  discountValue?: number;
}): { price: string; basePrice: string | null; discount: string | null } {
  // Early validation
  if (typeof amount !== 'number' || typeof baseAmount !== 'number') {
    return { price: "", basePrice: null, discount: null };
  }

  // Initialize with base amount
  let finalAmount = amount;
  let discount: string | null = null;

  try {
    // Apply discounts if available
    if (discountType && typeof discountValue === 'number' && discountValue > 0) {
      switch (discountType) {
        case 'percentage':
          if (discountValue <= 100) {
            finalAmount = amount * (1 - discountValue / 100);
            discount = `${discountValue}%`;
          }
          break;
        case 'fixed':
          if (discountValue <= amount) {
            finalAmount = amount - discountValue;
            discount = formatPrice({ amount: discountValue, currencyCode, locale });
          }
          break;
      }
    }

    // Format prices
    const price = formatPrice({ amount: finalAmount, currencyCode, locale });
    const basePrice = finalAmount !== amount ? formatPrice({ amount, currencyCode, locale }) : null;

    return { price, basePrice, discount };
  } catch {
    return { price: "", basePrice: null, discount: null };
  }
}

interface PriceData {
  price: string;
  basePrice: string | null;
  discount: string | null;
}

const defaultPriceData: PriceData = {
  price: "",
  basePrice: null,
  discount: null
};

export default function usePrice(
  data: {
    amount: number;
    baseAmount?: number;
    currencyCode: string;
    discountType?: string;
    discountValue?: number;
  }
) {
  const locale = "en";

  const value = useMemo(() => {
    try {
      if (typeof data?.amount !== 'number' || !data?.currencyCode) {
        return defaultPriceData;
      }

      return formatVariantPrice({
        amount: data.amount,
        baseAmount: data.baseAmount ?? data.amount,
        currencyCode: data.currencyCode,
        locale,
        discountType: data.discountType,
        discountValue: data.discountValue
      });
    } catch (error) {
      return defaultPriceData;
    }
  }, [data?.amount, data?.baseAmount, data?.currencyCode, data?.discountType, data?.discountValue]);

  return value;
}
