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
}) {
  let finalAmount = amount;
  let discount: string | null = null;

  if (discountType && discountValue) {
    switch (discountType) {
      case 'percentage':
        finalAmount = amount * (1 - discountValue / 100);
        discount = `${discountValue}%`;
        break;
      case 'fixed':
        finalAmount = amount - discountValue;
        discount = formatPrice({ amount: discountValue, currencyCode, locale });
        break;
      default:
        break;
    }
  }

  const price = formatPrice({ amount: finalAmount, currencyCode, locale });
  const basePrice = finalAmount !== amount ? formatPrice({ amount, currencyCode, locale }) : null;

  return { price, basePrice, discount };
}

export default function usePrice(
  data?: {
    amount: number;
    baseAmount?: number;
    currencyCode: string;
    discountType?: string;
    discountValue?: number;
  } | null
) {
  const { amount, baseAmount, currencyCode, discountType, discountValue } = data ?? {};
  const locale = "en";
  const value = useMemo(() => {
    if (typeof amount !== "number" || !currencyCode) return "";

    return formatVariantPrice({ 
      amount, 
      baseAmount: baseAmount || amount, 
      currencyCode, 
      locale,
      discountType,
      discountValue
    });
  }, [amount, baseAmount, currencyCode]);

  return typeof value === "string"
    ? { price: value, basePrice: null, discount: null }
    : value;
}
