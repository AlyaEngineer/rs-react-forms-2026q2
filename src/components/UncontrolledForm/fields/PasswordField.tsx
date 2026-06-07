import { useState } from 'react';
import ErrorField from '@/components/ErrorField/ErrorField';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator/PasswordStrengthIndicator';

interface PasswordFieldProps {
  error?: string;
}

const PasswordField = ({ error }: PasswordFieldProps) => {
  const [password, setPassword] = useState('');

  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Password
      </label>
      <div className="mt-2">
        <input
          id="password"
          name="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>

      <PasswordStrengthIndicator password={password} />

      <ErrorField error={error} />
    </div>
  );
};

export default PasswordField;
