import Image from "next/image";
import { Category } from "@framework/types";
import Text from "@components/ui/text";
import cn from "classnames";
import Router from 'next/router';

interface CategoryProps {
  category: Category;
  index: number;
  imgLoading?: "eager" | "lazy";
  variant?: "left" | "center" | "combined" | "flat" | "modern";
  disableBorderRadius?: boolean;
}

const CategoryOverlayCard: React.FC<CategoryProps> = ({
  category,
  index,
  variant = "left",
  imgLoading = "lazy",
  disableBorderRadius = false,
}) => {
  let size = 260;
  let classes;

  if (
    (variant === "left" && index === 0) ||
    (variant === "center" && index === 1) ||
    (variant === "combined" && index === 0)
  ) {
    classes = "row-span-full lg:row-span-2 col-span-full lg:col-span-2";
    size = 620;
  } else if (variant === "combined") {
    if (index === 2) {
      classes = "col-span-2 lg:col-span-1 lg:row-span-2";
      size = 620;
    } else {
      classes = "col-span-2 lg:col-span-1";
      size = 620;
    }
  } else if (variant === "modern") {
    classes = "col-span-2 md:row-span-2";
    size = 620;
  } else {
    classes = "col-span-2 lg:col-span-1";
  }

  function handlePopupView() {
    Router.push(`/${category?.slug}`);
  }

  return (
    <div
      onClick={handlePopupView}
      className={`${classes} cursor-pointer group flex flex-col bg-gray-200 ${
        !disableBorderRadius && "rounded-md"
      } relative items-center justify-between overflow-hidden`}
    >
    <div
      className={cn(
        "flex justify-center items-center p-4 h-full 3xl:min-h-[330px]",
        {
        "!p-0": variant === "modern",
        }
      )}
      title={category?.name}
    >
      <Image
        src={
        category?.image?.original ??
        "/assets/placeholder/products/product-featured.png"
        }
        width={size}
        height={size}
        loading={imgLoading}
        alt={category?.name || "Category Image"}
        className="transition duration-500 ease-in-out transform group-hover:scale-110 object-fill"
      />
    </div>

      {variant === "modern" && (
        <span
          className={cn(
            "absolute top-3.5 md:top-5 3xl:top-7 ltr:left-3.5 rtl:right-3.5 ltr:md:left-5 rtl:md:right-5 ltr:3xl:left-7 rtl:3xl:right-7 bg-[#B26788] text-white text-10px md:text-sm leading-5 inline-block px-2 xl:px-3 pt-0.5 pb-1",
            {
              "!py-0.5": variant === "modern",
              "rounded-md ": !disableBorderRadius,
            }
          )}
        >
          Featured
        </span>
      )}

      <div
        className="flex flex-col w-full px-4 pb-4 md:flex-row lg:flex-col 2xl:flex-row md:justify-between md:items-center lg:items-start 2xl:items-center md:px-5 3xl:px-7 md:pb-5 3xl:pb-7"
        title={category?.name}
      >
        <div className="overflow-hidden ltr:md:pr-2 rtl:md:pl-2 ltr:lg:pr-0 rtl:lg:pl-0 ltr:2xl:pr-2 rtl:2xl:pl-2">
          <h2 className="mb-1 text-sm font-semibold truncate text-heading md:text-base xl:text-lg">
            {category?.name}
          </h2>

          {variant !== "modern" ? (
            <p className="text-body text-xs xl:text-sm leading-normal xl:leading-relaxed truncate max-w-[250px]">
              {category?.details}
            </p>
          ) : (
            <Text className="pb-0.5 truncate">
              {category?.productCount || 0} Products
            </Text>
          )}
        </div>

        {variant !== "modern" && category?.productCount && (
          <div className="flex-shrink-0 flex flex-row-reverse md:flex-col lg:flex-row-reverse 2xl:flex-col items-center md:items-end lg:items-start 2xl:items-end justify-end ltr:md:text-right rtl:md:text-left lg:ltr:text-left rtl:text-right ltr:xl:text-right rtl:xl:text-left mt-2 md:-mt-0.5 lg:mt-2 2xl:-mt-0.5">
            <div className="text-heading font-segoe font-semibold text-base md:text-xl lg:text-base xl:text-xl 3xl:text-2xl 3xl:mt-0.5 ltr:pr-2 rtl:pl-2 ltr:md:pr-0 rtl:md:pl-0 ltr:lg:pr-2 rtl:lg:pl-2 ltr:2xl:pr-0 rtl:2xl:pl-0">
              {category.productCount} Products
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryOverlayCard;