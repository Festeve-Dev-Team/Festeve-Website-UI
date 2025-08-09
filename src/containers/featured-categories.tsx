import SectionHeader from "@components/common/section-header";
import CategoryOverlayCard from "@components/common/category-overlay-card";
import Alert from "@components/ui/alert";
import { Category } from "@framework/types";
import Image from "next/image";
import cn from "classnames";
import { useCategoriesQuery } from "@framework/category/get-all-categories";

interface FeaturedCategoriesProps {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  limit?: number;
  variant?: "left" | "center" | "combined" | "flat" | "modern";
  hideBanner?: boolean;
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
}

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  sectionHeading,
  categorySlug,
  className = "mb-12 md:mb-14 xl:mb-16",
  variant = "left",
  limit = 5,
  hideBanner = false,
  demoVariant,
  disableBorderRadius = false,
}) => {
  const { data, error } = useCategoriesQuery({
    limit: limit,
    demoVariant,
  });

  return (
    <div className={className}>
      <SectionHeader
        sectionHeading={sectionHeading}
        categorySlug={categorySlug}
      />
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div
          className={cn(
            `grid grid-cols-4 grid-rows-2 gap-${
              demoVariant === "ancient" ? 1 : 3
            } md:gap-${demoVariant === "ancient" ? 2 : 5} xl:gap-${
              demoVariant === "ancient" ? 1 : 7
            }`,
            {
              "lg:grid-cols-4": variant === "modern",
            }
          )}
        >
          {hideBanner === false && variant === "modern" && (
            <div className="col-span-2 md:row-span-2">
              <Image
                src="/assets/images/food.png"
                alt="banner"
                width={435}
                height={647}
                className="rounded-md object-contain"
              />
            </div>
          )}
          {data?.categories?.data?.slice(0, limit).map((category: Category, idx: number) => (
            <CategoryOverlayCard
              disableBorderRadius={disableBorderRadius}
              key={`category--key${category.id}`}
              category={category}
              variant={variant}
              index={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedCategories;
