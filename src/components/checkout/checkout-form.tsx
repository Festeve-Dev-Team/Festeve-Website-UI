import Input from '@components/ui/input';
import { useForm } from 'react-hook-form';
import TextArea from '@components/ui/text-area';
import { useCreateOrderMutation, CreateOrderResponse } from '@framework/order/use-create-order';
import { CheckBox } from '@components/ui/checkbox';
import Button from '@components/ui/button';
import Router from 'next/router';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';
import { useUI } from '@contexts/ui.context';
import { useCart } from '@contexts/cart/cart.context';

interface CheckoutInputType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  save: boolean;
  note: string;
}

const CheckoutForm: React.FC = () => {
  const { t } = useTranslation();
  const { showToast } = useUI();
  const { items } = useCart();
  const { mutate: createOrder, isPending } = useCreateOrderMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInputType>();

  function onSubmit(input: CheckoutInputType) {
    // Check if there are items in the cart
    if (!items.length) {
      showToast("Your cart is empty", "error");
      return;
    }
    // Transform cart items into order items
    const orderItems = items.map(item => ({
      productId: String(item.id),
      variantId: item.variant._id,
      quantity: item.quantity || 1
    }));

    createOrder({
      shippingAddress: {
        firstName: input.firstName,
        lastName: input.lastName,
        address: input.address,
        city: input.city,
        state: input.state || "",
        zipCode: input.zipCode,
        country: input.country || "IN",
        phone: input.phone,
        email: input.email
      },
      paymentProvider: "cod", // Default to Cash on Delivery
      paymentMethod: "cash",
      items: orderItems,
      notes: input.note
    }, {
      onSuccess: (data: CreateOrderResponse) => {
        showToast(data.message || "Order placed successfully!", "success");
        // Update cart state
        Router.push(ROUTES.ORDER);
      },
      onError: (error: Error) => {
        showToast(error.message || "Failed to place order", "error");
      }
    });
  }

  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t('text-shipping-address')}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center "
        noValidate
      >
        <div className="flex flex-col space-y-4 lg:space-y-5">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="forms:label-first-name"
              {...register('firstName', {
                required: 'forms:first-name-required',
              })}
              errorKey={errors.firstName?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />
            <Input
              labelKey="forms:label-last-name"
              {...register('lastName', {
                required: 'forms:last-name-required',
              })}
              errorKey={errors.lastName?.message}
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
            />
          </div>
          <Input
            labelKey="forms:label-address"
            {...register('address', {
              required: 'forms:address-required',
            })}
            errorKey={errors.address?.message}
            variant="solid"
          />
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              type="tel"
              labelKey="forms:label-phone"
              {...register('phone', {
                required: 'forms:phone-required',
                pattern: {
                  value: /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/,
                  message: 'Please enter a valid Indian phone number'
                },
                minLength: {
                  value: 10,
                  message: 'Phone number must be at least 10 digits'
                },
                maxLength: {
                  value: 13,
                  message: 'Phone number cannot exceed 13 digits'
                }
              })}
              onKeyDown={(e) => {
                // Allow only numbers, backspace, delete, tab, and arrow keys
                if (!/[\d]/.test(e.key) && 
                    !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              inputMode="numeric"
              pattern="[0-9]*"
              errorKey={errors.phone?.message}
              variant="solid"
              placeholder="Enter 10-digit mobile number"
              className="w-full lg:w-1/2"
            />

            <Input
              type="email"
              labelKey="forms:label-email-star"
              {...register('email', {
                required: 'forms:email-required',
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'forms:email-error',
                },
              })}
              errorKey={errors.email?.message}
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="forms:label-city"
              {...register('city', {
                required: 'forms:city-required'
              })}
              variant="solid"
              className="w-full lg:w-1/2"
              errorKey={errors.city?.message}
            />
            <Input
              labelKey="forms:label-postcode"
              type="tel"
              {...register('zipCode', {
                required: 'forms:postcode-required',
                pattern: {
                  value: /^[1-9][0-9]{5}$/,
                  message: 'Please enter a valid 6-digit PIN code'
                },
                validate: {
                  validPin: (value) => {
                    // Basic validation for Indian PIN code format
                    if (!/^[1-9][0-9]{5}$/.test(value)) {
                      return 'Invalid PIN code format';
                    }
                    // First digit should be 1-9
                    if (!/^[1-9]/.test(value)) {
                      return 'PIN code cannot start with 0';
                    }
                    return true;
                  }
                },
                maxLength: {
                  value: 6,
                  message: 'PIN code must be exactly 6 digits'
                }
              })}
              onKeyDown={(e) => {
                // Allow only numbers, backspace, delete, tab, and arrow keys
                if (!/[\d]/.test(e.key) && 
                    !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              inputMode="numeric"
              pattern="[0-9]*"
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
              placeholder="Enter 6-digit PIN code"
              errorKey={errors.zipCode?.message}
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="forms:label-state"
              {...register('state', {
                required: 'forms:state-required'
              })}
              variant="solid"
              className="w-full lg:w-1/2"
              errorKey={errors.state?.message}
            />
            <Input
              labelKey="forms:label-country"
              {...register('country')}
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
              defaultValue="IN"
            />
          </div>
          <div className="relative flex items-center ">
            <CheckBox labelKey="forms:label-save-information" />
          </div>
          <TextArea
            labelKey="forms:label-order-notes"
            {...register('note')}
            placeholderKey="forms:placeholder-order-notes"
            className="relative pt-3 xl:pt-6"
          />
          <div className="flex w-full">
            <Button
              className="w-full sm:w-auto"
              loading={isPending}
              disabled={isPending}
            >
              {t('common:button-place-order')}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
