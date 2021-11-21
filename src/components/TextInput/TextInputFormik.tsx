import { useField } from 'formik';
import React from 'react';
import TextInput from './TextInput';

type Props = {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
};

const TextInputFormik: React.FC<Props> = ({ name, ...rest }) => {
  const [field, meta] = useField(name);
  return (
    <TextInput
      name={name}
      {...rest}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      isError={!!(meta.touched && meta.error)}
      message={!!(meta.touched && meta.error) ? meta.error : ''}
    />
  );
};

export default TextInputFormik;
