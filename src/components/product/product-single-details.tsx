import React, { useState, useEffect } from "react";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useRouter } from "next/router";
import usePrice from "@framework/product/use-price";
import { useCreateCartMutation } from "@framework/cart/use-create-cart";
import { useCart } from "@contexts/cart/cart.context";
import { ProductAttributes } from "./product-attributes";
import isEmpty from "lodash/isEmpty";
import Link from "@components/ui/link";
import { useWindowSize } from "@utils/use-window-size";
import { showToast } from "@utils/toast";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import ProductMetaReview from "@components/product/product-meta-review";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { useUI } from "@contexts/ui.context";
import { Product, ProductVariant } from "@framework/types";
import { getAllProductImages } from "@utils/get-product-images";
import { useProductsQuery } from "@framework/product/get-all-products";
import { useTranslation } from "next-i18next";

const productGalleryCarouselResponsive = {
  "768": {
    slidesPerView: 2,
  },
  "0": {
    slidesPerView: 1,
  },
};

const ProductSingleDetails: React.FC = () => {
  const router = useRouter();
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const { modalData, openCart, isAuthorized, setModalView, openModal, setPostLoginAction } = useUI();
  const { slug } = router.query;
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);
  const { t } = useTranslation("common");

  // All hooks at the top level
  const { data: productsData, isLoading } = useProductsQuery({
    limit: 100
  });
  const { addItemToCart } = useCart();
  const { mutate: createCart } = useCreateCartMutation();

  // Find the specific product by id (using slug as id) or use modal data
  const productData = productsData?.pages?.[0]?.data?.find((p: Product) => p.slug === slug);
  const data = modalData?.data || productData;

  // State for selected variant
  const [selectedVariant, setSelectedVariant] = useState(data?.variants?.[0]);

  // Update selected variant and initialize attributes when data changes
  useEffect(() => {
    if (data?.variants?.length > 0) {
      const defaultVariant = data.variants[0];
      setSelectedVariant(defaultVariant);
      
      // Initialize default attributes from the variant's specs
      if (defaultVariant.specs) {
        const defaultAttributes: { [key: string]: string } = {};
        Object.entries(defaultVariant.specs).forEach(([key, value]) => {
          if (typeof value === 'string') {
            defaultAttributes[key] = value;
          }
        });
        setAttributes(defaultAttributes);
      }
    }
  }, [data]);

  // Always call usePrice with a consistent structure
  const priceInfo = usePrice({
    amount: selectedVariant?.price ?? 0,
    baseAmount: selectedVariant?.price ?? 0,
    currencyCode: 'INR',
    discountType: selectedVariant?.discountType,
    discountValue: selectedVariant?.discountValue
  });
  const { price, basePrice, discount } = priceInfo;

  useEffect(() => {
    if (!isLoading && (!data || !data.variants?.length)) {
      router.replace('/products');
    }
  }, [data, router, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data || !data.variants?.length) {
    return null;
  }
  // Get current variant's specs
  const specs = selectedVariant?.specs ?? {};
  
  // A variant is considered selected if:
  // 1. We have a selectedVariant
  // 2. Either there are no specs to select, or all required specs have been selected
  const isSelected = !!selectedVariant && (
    isEmpty(specs) || 
    (
      !isEmpty(attributes) &&
      Object.keys(specs).every(spec => 
        !specs[spec] || // Skip if spec value is null/undefined
        attributes.hasOwnProperty(spec)
      )
    )
  );

  function navigateToCartPage() {
    if (!isAuthorized) {
      setPostLoginAction(() => {
        setTimeout(() => {
          openCart();
        }, 300);
      });
      setModalView("LOGIN_VIEW");
      openModal();
      return;
    }

    setTimeout(() => {
      openCart();
    }, 300);
  }

  const addToCart = () => {
    if (!data) {
      showToast("Product data not available", "error");
      return;
    }

    // If no variant is selected, use the first available variant
    if (!selectedVariant && data.variants?.length > 0) {
      setSelectedVariant(data.variants[0]);
    }

    const variantToUse = selectedVariant || data.variants?.[0];

    if (!variantToUse) {
      showToast("No product variant available", "error");
      return;
    }

    try {
      setAddToCartLoader(true);

      // Generate a unique ID for the cart item based on product and variant
      const cartItemId = `${data._id}-${variantToUse._id}`;

      // Create cart item matching the expected Item interface
      const item = {
        id: cartItemId,
        name: data.name,
        slug: data.slug,
        image: variantToUse.images?.[0],
        price: variantToUse.price,
        variant_id: variantToUse._id,
        product_id: data._id,
        sku: variantToUse.sku,
        variant: {
          _id: variantToUse._id,
          sku: variantToUse.sku,
          specs: variantToUse.specs,
          size: variantToUse.size,
          color: variantToUse.color,
          colorCode: variantToUse.colorCode,
          colorFamily: variantToUse.colorFamily,
          material: variantToUse.material,
          weight: variantToUse.weight
        },
        attributes: attributes as Record<string, string>,
        quantity: quantity
      };

      // Add item to cart using both context and mutation
      addItemToCart(item, quantity);
      createCart({
        productId: data._id,
        variantId: variantToUse._id,
        quantity: quantity
      });

      showToast(`${data.name} added to cart successfully`, "success");

      setTimeout(() => {
        setAddToCartLoader(false);
        setViewCartBtn(true);
      }, 600);
    } catch (error) {
      showToast("Failed to add item to cart", "error");
      setAddToCartLoader(false);
    }
  }

  function handleAttribute(attribute: any) {
    setAttributes((prev) => ({
      ...prev,
      ...attribute,
    }));
  }

  return (
    <div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
      {width < 1025 ? (
        <Carousel
          pagination={{
            clickable: true,
          }}
          breakpoints={productGalleryCarouselResponsive}
          className="product-gallery"
          buttonGroupClassName="hidden"
        >
          {getAllProductImages(data).map((image: string, index: number) => (
            <SwiperSlide key={`product-gallery-key-${index}`}>
              <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image || "/assets/placeholder/products/product-gallery.svg"}
                  alt={`${data?.name}--${index}`}
                  className="object-cover w-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className="col-span-5 grid grid-cols-2 gap-2.5">
          {getAllProductImages(data).map((image, index) => (
            <div
              key={index}
              className="col-span-1 transition duration-150 ease-in hover:opacity-90"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image || "/assets/placeholder/products/product-gallery.svg"}
                alt={`${data.name}--${index}`}
                className="object-cover w-full"
              />
            </div>
          ))}
        </div>
      )}

      <div className="col-span-4 pt-8 lg:pt-0">
        <div className="pb-7 mb-7 border-b border-gray-300">
          <h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
            {data?.name}
          </h2>
          <p className="text-body text-sm lg:text-base leading-6 lg:leading-8">
            {data?.description}
          </p>
          <div className="flex items-center mt-5">
            <div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl ltr:pr-2 rtl:pl-2 ltr:md:pr-0 rtl:md:pl-0 ltr:lg:pr-2 rtl:lg:pl-2 ltr:2xl:pr-0 rtl:2xl:pl-0">
              {price}
            </div>
            {discount && (
              <span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ltr:pl-2 rtl:pr-2">
                {basePrice}
              </span>
            )}
          </div>
        </div>

        <div className="pb-3 border-b border-gray-300">
          {/* Variant Selection */}
          {data?.variants && data.variants.length > 1 && (
            <div className="mb-4">
              <h3 className="text-base font-semibold mb-2">{t("text-select-variant")}</h3>
              <div className="flex flex-wrap gap-2">
                {data.variants.map((variant: ProductVariant, index: number) => {
                  const isVariantSelected = selectedVariant?.sku === variant.sku;
                  return (
                    <Button
                      key={variant._id}
                      onClick={() => setSelectedVariant(variant)}
                      variant={isVariantSelected ? "flat" : "smoke"}
                      className={`min-w-[100px] ${isVariantSelected ? 'shadow-sm' : ''}`}
                    >
                      {variant.color || `Variant ${index + 1}`}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Variant Specs */}
          {selectedVariant?.specs && Object.entries(selectedVariant.specs).map(([key, value]) => {
            return (
              <ProductAttributes
                key={key}
                title={key}
                attributes={[{ id: 1, value: value as string, meta: '' }]}
                active={attributes[key]}
                onClick={handleAttribute}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-2.5 border-b border-gray-300 py-8">
          <div className="flex items-center gap-x-4">
            <Counter
              quantity={quantity}
              onIncrement={() => setQuantity((prev) => prev + 1)}
              onDecrement={() =>
                setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
              }
              disableDecrement={quantity === 1}
            />
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart();
              }}
              type="button"
              variant="slim"
              className={`w-full md:w-6/12 xl:w-full ${!isSelected && "bg-gray-400 hover:bg-gray-400"
                }`}
              disabled={!isSelected}
              loading={addToCartLoader}
            >
              <span className="py-2 3xl:px-8">{t("text-add-to-cart")}</span>
            </Button>
          </div>

          {viewCartBtn && (
            <Button
              onClick={navigateToCartPage}
              variant="flat"
              className="w-full h-11 md:h-12"
            >
              {t("text-view-cart")}
            </Button>
          )}
        </div>
        <div className="py-6">
          <ul className="text-sm space-y-5 pb-1">
            <li>
              <span className="font-semibold text-heading inline-block ltr:pr-2 rtl:pl-2">
                SKU:
              </span>
              {selectedVariant?.sku}
            </li>
            <li>
              <span className="font-semibold text-heading inline-block ltr:pr-2 rtl:pl-2">
                Category:
              </span>
              <Link
                href={`/category/${data.category}`}
                className="transition hover:underline hover:text-heading"
              >
                {data.category}
              </Link>
            </li>
            {data.tags && data.tags.length > 0 && (
              <li className="productTags">
                <span className="font-semibold text-heading inline-block ltr:pr-2 rtl:pl-2">
                  Tags:
                </span>
                {data.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="inline-block ltr:pr-1.5 rtl:pl-1.5 transition hover:underline hover:text-heading ltr:last:pr-0 rtl:last:pl-0"
                  >
                    {tag}
                    {index < data.tags.length - 1 && <span className="text-heading">,</span>}
                  </span>
                ))}
              </li>
            )}
          </ul>
        </div>

        <ProductMetaReview data={data} />
      </div>
    </div>
  );
};

export default ProductSingleDetails;
