import Input from '@components/ui/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { fadeInTop } from '@utils/motion/fade-in-top';
import {
  useUpdateUserMutation,
  UpdateUserType,
} from '@framework/customer/use-update-customer';
import { RadioBox } from '@components/ui/radiobox';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { PencilIcon } from '@components/icons/pencil-icon';

const mockUserData: UpdateUserType = {
  firstName: 'John',
  lastName: 'Doe',
  displayName: 'John Doe',
  phoneNumber: '1234567890',
  email: 'john@example.com',
  gender: 'male',
  password: '',
  confirmPassword: ''
};

const AccountDetails: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateUser, isPending } = useUpdateUserMutation();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UpdateUserType>({
    defaultValues: mockUserData, // Replace with actual user data from your API
  });
  function onSubmit(input: UpdateUserType) {
    updateUser(input);
    setIsEditing(false);
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

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
          <div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
            <div className="w-full sm:w-1/2">
              <span className="text-sm text-heading font-semibold block mb-2">
                {t('forms:label-first-name')}
              </span>
              <span className="text-sm text-body">{mockUserData.firstName}</span>
            </div>
            <div className="w-full sm:w-1/2">
              <span className="text-sm text-heading font-semibold block mb-2">
                {t('forms:label-last-name')}
              </span>
              <span className="text-sm text-body">{mockUserData.lastName}</span>
            </div>
          </div>
          <div>
            <span className="text-sm text-heading font-semibold block mb-2">
              {t('forms:label-display-name')}
            </span>
            <span className="text-sm text-body">{mockUserData.displayName}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
            <div className="w-full sm:w-1/2">
              <span className="text-sm text-heading font-semibold block mb-2">
                {t('forms:label-phone')}
              </span>
              <span className="text-sm text-body">{mockUserData.phoneNumber}</span>
            </div>
            <div className="w-full sm:w-1/2">
              <span className="text-sm text-heading font-semibold block mb-2">
                {t('forms:label-email')}
              </span>
              <span className="text-sm text-body">{mockUserData.email}</span>
            </div>
          </div>
          <div>
            <span className="text-sm text-heading font-semibold block mb-2">
              {t('common:text-gender')}
            </span>
            <span className="text-sm text-body capitalize">{mockUserData.gender}</span>
          </div>
        </div>
      ) : (
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center "
        noValidate
      >
        <div className="flex flex-col space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
            <Input
              labelKey="forms:label-first-name"
              {...register('firstName', {
                required: 'forms:first-name-required',
              })}
              variant="solid"
              className="w-full sm:w-1/2"
              errorKey={errors.firstName?.message}
            />
            <Input
              labelKey="forms:label-last-name"
              {...register('lastName', {
                required: 'forms:last-name-required',
              })}
              variant="solid"
              className="w-full sm:w-1/2"
              errorKey={errors.lastName?.message}
            />
          </div>
          <Input
            labelKey="forms:label-display-name"
            {...register('displayName', {
              required: 'forms:display-name-required',
            })}
            variant="solid"
            errorKey={errors.displayName?.message}
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
          <div className="relative flex flex-col">
            <span className="mt-2 text-sm text-heading font-semibold block pb-1">
              {t('common:text-gender')}
            </span>
            <div className="mt-2 flex items-center gap-x-6">
              <RadioBox
                labelKey="forms:label-male"
                {...register('gender')}
                value="male"
              />
              <RadioBox
                labelKey="forms:label-female"
                {...register('gender')}
                value="female"
              />
            </div>
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
