import Input from '@components/ui/input';
import Button from '@components/ui/button';
import Select from '@components/ui/select';
import { useForm } from 'react-hook-form';
import Logo from '@components/ui/logo';
import { useUI } from '@contexts/ui.context';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

interface SignUpStep1Type {
  name: string;
  gender: 'male' | 'female';
  mobile: string;
  email: string;
  otp: string[];
  agreeToComms: boolean;
}

interface SignUpStep2Type {
  specialDay: string;
  specialPersonName: string;
  dateDay: string;
  dateMonth: string;
  dateYear: string;
  relation: string;
  reminderTime: string;
  categories: string[];
}

const SPECIAL_DAYS = [
  'Birthday',
  'Wedding Anniversary',
  'House Warming',
  'Baby Shower',
  'Engagement',
  'Graduation',
  'Job Promotion'
];

const RELATIONS = [
  'Parent',
  'Sibling',
  'Spouse',
  'Child',
  'Friend',
  'Relative',
  'Colleague'
];

const REMINDER_TIMES = [
  '1 day before',
  '2 days before',
  '5 days before',
  'A week before'
];

const CATEGORIES = [
  'Food',
  'Clothing',
  'Gift',
  'Essentials',
  'Combos & Hampers'
];

const SignUpForm: React.FC = () => {
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpInput = (index: number, value: string) => {
    if (value.length === 1 && index < 3) {
      otpInputs.current[index + 1]?.focus();
    } else if (value.length === 0 && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { closeModal } = useUI();
  const step1Form = useForm<SignUpStep1Type>({
    mode: 'onChange',
    defaultValues: {
      otp: ['', '', '', ''],
      agreeToComms: false
    }
  });

  const step2Form = useForm<SignUpStep2Type>({
    mode: 'onChange',
    defaultValues: {
      categories: []
    }
  });

  const watchAllFields = step1Form.watch();
  const watchStep2Fields = step2Form.watch();

  const handleGetOTP = () => {
    // Add your OTP sending logic here
    setIsOtpSent(true);
  };

  const isNextEnabled = step1Form.formState.isValid &&
    watchAllFields.name &&
    watchAllFields.gender &&
    watchAllFields.mobile &&
    watchAllFields.email &&
    isOtpSent &&
    watchAllFields.otp.every(digit => digit) &&
    watchAllFields.agreeToComms;

  const isSignUpEnabled = step2Form.formState.isValid &&
    watchStep2Fields.specialDay &&
    watchStep2Fields.specialPersonName &&
    watchStep2Fields.dateDay &&
    watchStep2Fields.dateMonth &&
    watchStep2Fields.dateYear &&
    watchStep2Fields.relation &&
    watchStep2Fields.reminderTime &&
    (watchStep2Fields.categories?.length ?? 0) > 0;

  function onSubmitStep1(data: SignUpStep1Type) {
    if (isNextEnabled) {
      setStep(2);
      console.log(data, 'step 1 values');
    }
  }

  function onSubmitStep2(data: SignUpStep2Type) {
    if (isSignUpEnabled) {
      console.log(data, 'step 2 values');
      // Add your signup logic here
    }
  }

  return (
    <div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
      <div className="text-center mb-6 pt-2.5">
        <div onClick={closeModal}>
          <Logo />
        </div>
        <h3 className="text-lg font-semibold text-heading">Create Account</h3>
      </div>
      {step === 1 ? (
        <form
          onSubmit={step1Form.handleSubmit(onSubmitStep1)}
          className="flex flex-col justify-center"
          noValidate
        >
          <div className="flex flex-col space-y-4">
            {/* Name Input */}
            <Input
              labelKey="Name"
              type="text"
              variant="solid"
              {...step1Form.register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              errorKey={step1Form.formState.errors.name?.message}
            />

            {/* Gender Selection */}
            <div className="flex flex-col">
              <label className="text-sm md:text-base font-semibold text-heading mb-2">Gender</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="male"
                    {...step1Form.register('gender', { required: 'Gender is required' })}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="female"
                    {...step1Form.register('gender', { required: 'Gender is required' })}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
              {step1Form.formState.errors.gender && (
                <p className="text-red-500 text-sm mt-1">{step1Form.formState.errors.gender.message}</p>
              )}
            </div>

            {/* Email Input */}
            <Input
              labelKey="Email"
              type="email"
              variant="solid"
              {...step1Form.register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              errorKey={step1Form.formState.errors.email?.message}
            />

            {/* Mobile Number with OTP Button */}
            <div className="relative">
              <Input
                labelKey="Mobile Number"
                type="tel"
                variant="solid"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                {...step1Form.register('mobile', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid 10-digit mobile number'
                  }
                })}
                errorKey={step1Form.formState.errors.mobile?.message}
              />
              <Button
                type="button"
                onClick={handleGetOTP}
                className="absolute right-1 top-1/2 -translate-y h-8 px-3 -mt-1 bg-heading text-white"
                disabled={!watchAllFields.mobile || isOtpSent}
              >
                {isOtpSent ? 'Resend OTP' : 'Get OTP'}
              </Button>
            </div>

            {/* OTP Input Boxes */}
            {isOtpSent && (
              <div className="flex flex-col">
                <label className="text-sm md:text-base font-semibold text-heading mb-2">Enter OTP</label>
                <div className="flex gap-2 justify-between">
                  {[0, 1, 2, 3].map((index) => {
                    const registration = step1Form.register(`otp.${index}` as const, {
                      required: true,
                      pattern: /^[0-9]$/,
                      onChange: (e) => handleOtpInput(index, e.target.value)
                    });

                    return (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:border-heading"
                        {...registration}
                        ref={(el) => {
                          registration.ref(el);
                          otpInputs.current[index] = el;
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Agreement Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                {...step1Form.register('agreeToComms', { required: 'Please agree to receive communications' })}
              />
              <label className="text-sm text-body">
                Agree to receive communications related to the order and promotional offers
              </label>
            </div>
            {step1Form.formState.errors.agreeToComms && (
              <p className="text-red-500 text-sm">{step1Form.formState.errors.agreeToComms.message}</p>
            )}

            {/* Next Button */}
            <Button
              type="submit"
              disabled={!isNextEnabled}
              className="h-11 md:h-12 w-full mt-2"
            >
              Verify OTP
            </Button>
          </div>
        </form>)
        : (
          <form
            onSubmit={step2Form.handleSubmit(onSubmitStep2)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl font-semibold text-heading mb-4">Let us remind U!<br />On your Special day</h2>

              {/* Special Day Dropdown */}
              <Select
                labelKey="Special Day"
                inputClassName="p-4"
                {...step2Form.register('specialDay', { required: 'Please select a special day' })}
                variant="solid"
                errorKey={step2Form.formState.errors.specialDay?.message}
              >
                <option value="">Select a special day</option>
                {SPECIAL_DAYS.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </Select>

              {/* Special Person Name */}
              <Input
                labelKey="Name of your special person"
                type="text"
                variant="solid"
                {...step2Form.register('specialPersonName', {
                  required: 'Please enter the name',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
                errorKey={step2Form.formState.errors.specialPersonName?.message}
              />

              {/* Date Input */}
              <div className="flex flex-col">
                <label className="text-sm md:text-base font-semibold text-heading mb-2">Date of the day</label>
                <div className="flex gap-4">
                  <Input
                    type="text"
                    placeholder="DD"
                    variant="solid"
                    className="w-20"
                    maxLength={2}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    {...step2Form.register('dateDay', {
                      required: 'Required',
                      pattern: { value: /^(0[1-9]|[12]\d|3[01])$/, message: 'Invalid day' }
                    })}
                    errorKey={step2Form.formState.errors.dateDay?.message}
                  />
                  <Input
                    type="text"
                    placeholder="MM"
                    variant="solid"
                    className="w-20"
                    maxLength={2}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    {...step2Form.register('dateMonth', {
                      required: 'Required',
                      pattern: { value: /^(0[1-9]|1[0-2])$/, message: 'Invalid month' }
                    })}
                    errorKey={step2Form.formState.errors.dateMonth?.message}
                  />
                  <Input
                    type="text"
                    placeholder="YYYY"
                    variant="solid"
                    className="w-28"
                    maxLength={4}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    {...step2Form.register('dateYear', {
                      required: 'Required',
                      pattern: { value: /^\d{4}$/, message: 'Invalid year' }
                    })}
                    errorKey={step2Form.formState.errors.dateYear?.message}
                  />
                </div>
              </div>

              {/* Relation Dropdown */}
              <Select
                labelKey="Relation"
                inputClassName="p-4"
                {...step2Form.register('relation', { required: 'Please select a relation' })}
                variant="solid"
                errorKey={step2Form.formState.errors.relation?.message}
              >
                <option value="">Select relation</option>
                {RELATIONS.map(relation => (
                  <option key={relation} value={relation}>{relation}</option>
                ))}
              </Select>

              {/* Reminder Time Dropdown */}
              <Select
                labelKey="When can we remind you?"
                inputClassName="p-4"
                {...step2Form.register('reminderTime', { required: 'Please select when to remind you' })}
                variant="solid"
                errorKey={step2Form.formState.errors.reminderTime?.message}
              >
                <option value="">Select reminder time</option>
                {REMINDER_TIMES.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </Select>

              {/* Category Preferences */}
              <div className="flex flex-col">
                <label className="text-sm md:text-base font-semibold text-heading mb-2">Category preferences</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(category => (
                    <label key={category} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value={category}
                        className="hidden"
                        {...step2Form.register('categories', { required: 'Please select at least one category' })}
                      />
                      <span className={cn(
                        'px-4 py-2 rounded-full border border-gray-300 cursor-pointer transition-colors',
                        {
                          'bg-heading text-white': watchStep2Fields.categories?.includes(category),
                          'bg-white text-body hover:bg-gray-100': !watchStep2Fields.categories?.includes(category)
                        }
                      )}>
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
                {step2Form.formState.errors.categories && (
                  <p className="text-red-500 text-sm mt-1">{step2Form.formState.errors.categories.message}</p>
                )}
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                disabled={!isSignUpEnabled}
                className="h-11 md:h-12 w-full mt-2"
              >
                Sign Up
              </Button>
            </div>
          </form>
        )}
    </div>
  );
};

export default SignUpForm;
