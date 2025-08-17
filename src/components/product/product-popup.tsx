import React, { useState } from "react";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import { useCreateCartMutation } from "@framework/cart/use-create-cart";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useCart } from "@contexts/cart/cart.context";
import { ProductAttributes } from "@components/product/product-attributes";
import { generateCartItem } from "@utils/generate-cart-item";
import usePrice from "@framework/product/use-price";
import { getVariations } from "@framework/utils/get-variations";
import { useTranslation } from "next-i18next";
import { getAllProductImages } from "@utils/get-product-images";
import { showToast } from "@utils/toast";
import { ProductVariant } from "@framework/types";

export default function ProductPopup() {
  const { t } = useTranslation("common");
  const {
    modalData,
    closeModal,
    openCart,
    isAuthorized,
    setModalView,
    openModal,
    setPostLoginAction,
  } = useUI();
  
  const data = modalData?.data;
  const router = useRouter();
  const { addItemToCart } = useCart();
  const { mutate: createCart } = useCreateCartMutation();
  const [quantity, setQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

  const { price, basePrice, discount } = usePrice({
    amount: data.sale_price ? data.sale_price : data.price,
    baseAmount: data.price,
    currencyCode: 'INR',
  });
  const variations = getVariations(data.variations);
  const { slug, name, description } = data;

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;

  function addToCart() {
    if (!isSelected || !data) {
      showToast('Please select all product options', 'error');
      return;
    }
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    try {
      const selectedVariant = data.variants?.find((v: ProductVariant) => v.isActive) || data.variants?.[0];
      
      if (!selectedVariant) {
        throw new Error('No variant available');
      }

      const cartItem = generateCartItem(data, selectedVariant, attributes);
      // Add quantity and ensure attributes type
      const item = {
        ...cartItem,
        quantity,
        attributes: attributes as Record<string, string>
      };
      
      // Call both the context update and the mutation
      addItemToCart(item, quantity);
      createCart({
        productId: data._id,
        variantId: selectedVariant._id,
        quantity: quantity
      });
      showToast(`${data.name} added to cart successfully`, 'success');
      setTimeout(() => {
        setAddToCartLoader(false);
        setViewCartBtn(true);
      }, 600);
    } catch (error) {
      showToast('Failed to add item to cart', 'error');
      setAddToCartLoader(false);
    }
  }

  function navigateToProductPage() {
    closeModal();
    router.push(`${ROUTES.PRODUCT}/${slug}`, undefined, {
      locale: router.locale,
    });
  }

  function handleAttribute(attribute: any) {
    setAttributes((prev) => ({
      ...prev,
      ...attribute,
    }));
  }

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

    closeModal();
    setTimeout(() => {
      openCart();
    }, 300);
  }
 
  // Early return if no data to prevent hydration issues
  if (!data) {
    return null;
  }

  return (
    <div className="rounded-lg bg-white">
      <div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto overflow-hidden">
        <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-gray-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              getAllProductImages(data)[0] ||
              "/assets/placeholder/products/product-thumbnail.svg"
            }
            alt={name}
            className="lg:object-cover lg:w-full lg:h-full"
          />
        </div>

        <div className="flex flex-col p-5 md:p-8 w-full">
          <div className="pb-5">
            <div
              className="mb-2 md:mb-2.5 block -mt-1.5"
              onClick={navigateToProductPage}
              role="button"
            >
              <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black">
                {name}
              </h2>
            </div>
            <p className="text-sm leading-6 md:text-body md:leading-7">
              {description}
            </p>

            <div className="flex items-center mt-3">
              <div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
                {price}
              </div>
              {discount && (
                <del className="font-segoe text-gray-400 text-base lg:text-xl ltr:pl-2.5 rtl:pr-2.5 -mt-0.5 md:mt-0">
                  {basePrice}
                </del>
              )}
            </div>
          </div>

          {Object.keys(variations).map((variation) => {
            return (
              <ProductAttributes
                key={`popup-attribute-key${variation}`}
                title={variation}
                attributes={variations[variation]}
                active={attributes[variation]}
                onClick={handleAttribute}
              />
            );
          })}

          <div className="pt-2 md:pt-4">
            <div className="flex items-center justify-between mb-4 gap-x-3 sm:gap-x-4">
              <Counter
                quantity={quantity}
                onIncrement={() => setQuantity((prev) => prev + 1)}
                onDecrement={() =>
                  setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                }
                disableDecrement={quantity === 1}
              />
              <Button
                onClick={addToCart}
                variant="flat"
                className={`w-full h-11 md:h-12 px-1.5 ${
                  !isSelected && "bg-gray-400 hover:bg-gray-400"
                }`}
                disabled={!isSelected}
                loading={addToCartLoader}
              >
                {t("text-add-to-cart")}
              </Button>
            </div>

            {viewCartBtn && (
              <button
                onClick={navigateToCartPage}
                className="w-full mb-4 h-11 md:h-12 rounded bg-gray-100 text-heading focus:outline-none border border-gray-300 transition-colors hover:bg-gray-50 focus:bg-gray-50"
              >
                {t("text-view-cart")}
              </button>
            )}

            <Button
              onClick={navigateToProductPage}
              variant="flat"
              className="w-full h-11 md:h-12"
            >
              {t("text-view-details")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
