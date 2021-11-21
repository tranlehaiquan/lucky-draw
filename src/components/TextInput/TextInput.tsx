import clsx from 'clsx';
import noop from 'lodash/noop';
import React from 'react';

export interface TextInputProps {
  className?: string;
  label?: string;
  name?: string;
  message?: string;
  isError?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  type: string;
  required?: boolean;
  value: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  onChange = noop,
  onBlur = noop,
  placeholder,
  message,
  isError = false,
  type,
  required,
  value,
}) => {
  return (
    <label className="block mb-6">
      <label className="text-white">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        className={clsx(
          isError ? 'border-red-500' : 'border-transparent',
          'mt-1 block w-full rounded-md bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0'
        )}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {message && (
        <span className={clsx(isError && 'text-red-500', 'text-sm lg:text-base')}>{message}</span>
      )}
    </label>
  );
};

export default TextInput;
