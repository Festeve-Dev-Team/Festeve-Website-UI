import Input from '@components/ui/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { fadeInTop } from '@utils/motion/fade-in-top';
import {
  useUpdateUserMutation,
} from '@framework/customer/use-update-customer';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useRef } from 'react';
import { PencilIcon } from '@components/icons/pencil-icon';
import { useAccountDetailsQuery } from '@framework/auth/use-account-details';
import ErrorPage from 'src/pages/404';
import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';
import Spinner from '@components/ui/loaders/spinner';

type UserDataType = {
  name: string;
  phoneNumber: string;
  email: string;
  password?: string;
  confirmPassword?: string;
};

const AccountDetails: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const { isAuthorized, openModal, setModalView, displayModal, closeModal } = useUI();
  const { data: userData, isLoading, isError } = useAccountDetailsQuery();
  const router = useRouter();
  const { mutate: updateUser, isPending } = useUpdateUserMutation();
  const { t } = useTranslation();

  // Track the previous modal state
  const prevModalState = useRef(displayModal);

  useEffect(() => {
    if (!isAuthorized && !hasShownModal) {
      setModalView("LOGIN_VIEW");
      openModal();
      setHasShownModal(true);
    }

    // Check if modal was just closed (previous state was true and current is false)
    if (prevModalState.current && !displayModal && !isAuthorized) {
      closeModal();
      router.push('/');
    }
    // Update the previous state
    prevModalState.current = displayModal;
  }, [isAuthorized, openModal, setModalView, displayModal, router, closeModal, hasShownModal, setHasShownModal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDataType>({
    defaultValues: {
      name: userData?.name || '',
      phoneNumber: userData?.phone || '',
      email: userData?.email || '',
    },
  });

  function onSubmit(input: any) {
    updateUser(input);
    setIsEditing(false);
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  if(isLoading) return <div className="flex items-center justify-center"><Spinner text="Loading User Data..." /></div>;
  if (isError) return <ErrorPage />;

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      //@ts-ignore
      variants={fadeInTop(0.35)}
      className={`w-full flex flex-col`}
    >
      <div className="flex justify-between items-center mb-6 xl:mb-8">
        <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading">
          {t('common:text-account-details')}
        </h2>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center text-sm font-semibold text-heading transition-colors duration-200 focus:outline-none hover:text-accent-hover"
          >
            <PencilIcon />&nbsp;{t('common:button-edit')}
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="flex flex-col space-y-4">
          <div>
            <span className="text-sm text-heading font-semibold block mb-2">
              {t('forms:label-name')}
            </span>
            <span className="text-sm text-body">{userData?.name}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
            <div className="w-full sm:w-1/2">
              <span className="text-sm text-heading font-semibold block mb-2">
                {t('forms:label-phone')}
              </span>
              <span className="text-sm text-body">{userData?.phone}</span>
            </div>
            <div className="w-full sm:w-1/2">
              <span className="text-sm text-heading font-semibold block mb-2">
                {t('forms:label-email')}
              </span>
              <span className="text-sm text-body">{userData?.email}</span>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mx-auto flex flex-col justify-center "
          noValidate
        >
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <Input
              labelKey="forms:label-name"
              {...register('name', {
                required: 'forms:name-required',
              })}
              variant="solid"
              errorKey={errors.name?.message}
            />
            <div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
              <Input
                type="tel"
                labelKey="forms:label-phone"
                {...register('phoneNumber', {
                  required: 'forms:phone-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2"
                errorKey={errors.phoneNumber?.message}
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
                variant="solid"
                className="w-full sm:w-1/2"
                errorKey={errors.email?.message}
              />
            </div>
            <div className="relative flex gap-x-3">
              <Button
                type="submit"
                loading={isPending}
                disabled={isPending}
                className="h-12 mt-3 w-full sm:w-32"
              >
                {t('common:button-save')}
              </Button>
            </div>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default AccountDetails;
