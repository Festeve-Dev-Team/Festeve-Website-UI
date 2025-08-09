import React, { SelectHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

export interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  inputClassName?: string;
  labelKey?: string;
  placeholderKey?: string;
  name: string;
  errorKey?: string;
  variant?: 'normal' | 'solid' | 'outline';
}

const Select = forwardRef<HTMLSelectElement, Props>(
  (
    {
      className = 'block',
      labelKey,
      name,
      errorKey,
      variant = 'normal',
      inputClassName,
      children,
      ...rest
    },
    ref
  ) => {
    const rootClassName = cn(
      'w-full',
      {
        'py-2': variant === 'normal',
        'border-2 border-skin-base focus:border-skin-primary rounded focus:outline-none':
          variant === 'outline',
        'border border-gray-300 focus:border-heading rounded-md focus:outline-none':
          variant === 'solid',
      },
      inputClassName
    );

    return (
      <div className={className}>
        {labelKey && (
          <label
            htmlFor={name}
            className="block text-sm md:text-base font-semibold text-heading mb-2"
          >
            {labelKey}
          </label>
        )}
        <select
          id={name}
          name={name}
          ref={ref}
          className={rootClassName}
          {...rest}
        >
          {children}
        </select>
        {errorKey && <p className="text-red-500 text-sm mt-1">{errorKey}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
