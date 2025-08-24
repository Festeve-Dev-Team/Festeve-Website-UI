import Text from '@components/ui/text';
import Input from '@components/ui/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getDirection } from '@utils/get-direction';
import { showToast } from '@utils/toast';
import { useMutation } from '@tanstack/react-query';
import http from '@framework/utils/http';

const data = {
  title: 'common:text-callback-heading',
  description: 'common:text-callback-description',
  buttonText: 'common:button-request-callback',
};

interface Props {
  className?: string;
}

type FormValues = {
  phone: string;
};

const defaultValues = {
  phone: '',
};

interface CallbackResponse {
  message: string;
}

interface CallbackInputType {
  phone: {
    raw: string;
  };
}

async function requestCallback(input: CallbackInputType): Promise<CallbackResponse> {
  const response = await http.post('/newsletters/callback', input);
  return response.data;
}

const RequestCallback: React.FC<Props> = ({
  className = 'px-5 sm:px-8 md:px-16 2xl:px-24',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues,
  });
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const { t } = useTranslation();
  const { title, description, buttonText } = data;

  const { mutate: submitCallback, isPending } = useMutation<CallbackResponse, Error, CallbackInputType>({
    mutationFn: requestCallback,
    onSuccess: (data) => {
      showToast(data.message || 'Callback request submitted successfully!', 'success');
      reset();
    },
    onError: (error) => {
      showToast(error.message || 'Failed to submit callback request', 'error');
    },
  });

  async function onSubmit(input: FormValues) {
    submitCallback({
      phone: {
        raw: input.phone,
      },
    });
  }
  return (
    <div
      className={`${className} relative overflow-hidden flex flex-col sm:items-center xl:items-start rounded-lg bg-gray-200 py-10 md:py-14 lg:py-16 mb-10`}
    >
      <div className="-mt-1.5 lg:-mt-2 xl:-mt-0.5 text-center ltr:xl:text-left rtl:xl:text-right mb-7 md:mb-8 lg:mb-9 xl:mb-0">
        <Text
          variant="mediumHeading"
          className="mb-2 md:mb-2.5 lg:mb-3 xl:mb-3.5"
        >
          {t(`${title}`)}
        </Text>
        <p className="text-xs leading-6 text-body md:text-sm md:leading-7">
          {t(`${description}`)}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-shrink-0 w-full sm:w-96 md:w-[545px] md:mt-7 z-10"
        noValidate
      >
        <div className="flex flex-col items-start justify-end sm:flex-row">
          <Input
            placeholderKey="forms:placeholder-phone-callback"
            type="tel"
            variant="solid"
            className="w-full"
            inputClassName="px-4 lg:px-7 h-12 lg:h-14 text-center ltr:sm:text-left rtl:sm:text-right bg-white"
            {...register('phone', {
              required: 'forms:phone-required',
              pattern: {
                value: /^[\+]?[1-9][\d]{0,15}$/,
                message: 'forms:phone-error',
              },
            })}
            errorKey={errors.phone?.message}
          />
          <Button
            className="flex-shrink-0 w-full mt-3 sm:mt-0 sm:w-auto ltr:sm:ml-2 rtl:sm:mr-2 md:h-full"
            loading={isPending}
            disabled={isPending}
          >
            <span className="lg:py-0.5">{t(`${buttonText}`)}</span>
          </Button>
        </div>
      </form>
      <div
        style={{
          backgroundImage:
            dir === 'rtl'
              ? 'url(/assets/images/subscription-bg-reverse.png)'
              : 'url(/assets/images/subscription-bg.png)',
        }}
        className={`hidden z-0 xl:block bg-no-repeat ${dir === 'rtl'
          ? 'bg-left 2xl:-left-12 3xl:left-0'
          : 'bg-right xl:-right-24 2xl:-right-20 3xl:right-0'
          } bg-contain xl:bg-cover 3xl:bg-contain absolute h-full w-full top-0`}
      />
    </div>
  );
};

export default RequestCallback;
