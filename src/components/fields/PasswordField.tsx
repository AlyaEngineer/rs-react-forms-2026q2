import { useState } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import FormField from '@/components/FormField/FormField';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator/PasswordStrengthIndicator';
import type { FormSchemaData } from '@/schemas/formSchema';

interface PasswordFieldProps {
  error?: string;
  register?: UseFormRegister<FormSchemaData>;
  password?: string;
}

const PasswordField = ({ error, register, password }: PasswordFieldProps) => {
  const [localPassword, setLocalPassword] = useState('');
  const displayPassword = password ?? localPassword;

  return (
    <>
      <FormField id="password" label="Password" error={error}>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          {...(register
            ? register('password')
            : {
                onChange: (e) => {
                  setLocalPassword(e.target.value);
                },
              })}
        />
      </FormField>
      <PasswordStrengthIndicator password={displayPassword} />
    </>
  );
};

export default PasswordField;
