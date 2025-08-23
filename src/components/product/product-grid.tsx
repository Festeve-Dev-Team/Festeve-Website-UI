import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import type { FC } from "react";
import { useProductsQuery } from "@framework/product/get-all-products";
import { useRouter } from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { Product } from "@framework/types";
import cn from "classnames";
interface ProductGridProps {
  className?: string;
  variant?: "circle" | "rounded" | "listSmall" | "grid" | "gridSlim" | "list" | "gridModern" | "gridModernWide" | "gridTrendy";
  limit?: number;
  imgWidth?: number | string;
  imgHeight?: number | string;
  hideProductDescription?: boolean;
  showCategory?: boolean;
  showRating?: boolean;
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
}

export const ProductGrid: FC<ProductGridProps> = ({ 
  className = "",
  variant = "grid",
  limit = 1000,
  imgWidth,
  imgHeight,
  hideProductDescription = false,
  showCategory = false,
  showRating = false,
  demoVariant,
  disableBorderRadius = false,
}) => {
  const { query } = useRouter();
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({ limit: 1000, ...query });
  const { t } = useTranslation("common");
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div
        className={cn(
          `grid gap-x-${demoVariant === "ancient" ? 2 : 3} md:gap-x-${
            demoVariant === "ancient" ? 2 : 5
          } xl:gap-x-${demoVariant === "ancient" ? 2 : 7} gap-y-${
            demoVariant === "ancient" ? 2 : 3
          } xl:gap-y-${demoVariant === "ancient" ? 2 : 5} 2xl:gap-y-${
            demoVariant === "ancient" ? 3 : 8
          } ${className}`,
          {
            "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5":
              variant === "grid",
            "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4":
              variant === "gridModernWide",
            "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5":
              variant === "gridModern",
          }
        )}
      >
        {isLoading && !data?.pages?.length ? (
          <ProductFeedLoader limit={limit} uniqueKey="search-product" />
        ) : (
          data?.pages?.map((page, pageIndex) => {
            return page?.data?.map((product: Product, productIndex: number) => (
              <ProductCard
                key={`product--key${product._id || `${pageIndex}-${productIndex}`}`}
                product={product}
                variant={variant}
                imgWidth={imgWidth}
                imgHeight={imgHeight}
                hideProductDescription={hideProductDescription}
                showCategory={showCategory}
                showRating={showRating}
                demoVariant={demoVariant}
                disableBorderRadius={disableBorderRadius}
              />
            ));
          })
        )}
      </div>
      <div className="text-center pt-8 xl:pt-14">
        {hasNextPage && (
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
            variant="slim"
          >
            {t("button-load-more")}
          </Button>
        )}
      </div>
    </>
  );
};
