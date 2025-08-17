import React from 'react';
import cn from 'classnames';

interface SpinnerProps {
  text?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ text, className }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-heading border-t-transparent"></div>
      </div>
      {text && <div className="text-sm text-heading mt-8 text-center">{text}</div>}
    </div>
  );
};

export default Spinner;
