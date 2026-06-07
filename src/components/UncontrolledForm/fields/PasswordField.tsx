import { useState } from 'react';
import FormField from '@/components/FormField/FormField';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator/PasswordStrengthIndicator';

const PasswordField = ({ error }: { error?: string }) => {
  const [password, setPassword] = useState('');

  return (
    <>
      <FormField id="password" label="Password" error={error}>
        <input
          id="password"
          name="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </FormField>
      <PasswordStrengthIndicator password={password} />
    </>
  );
};

export default PasswordField;
