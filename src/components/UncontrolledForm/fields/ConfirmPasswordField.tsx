import ErrorField from '@/components/ErrorField/ErrorField';

interface ConfirmPasswordFieldProps {
  error?: string;
}

const ConfirmPasswordField = ({ error }: ConfirmPasswordFieldProps) => {
  return (
    <div>
      <label
        htmlFor="confirmPassword"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Confirm Password
      </label>
      <div className="mt-2">
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
      
      <ErrorField error={error} />
    </div>
  );
};

export default ConfirmPasswordField;
