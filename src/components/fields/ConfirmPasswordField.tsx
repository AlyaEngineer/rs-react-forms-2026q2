import type { UseFormRegister } from 'react-hook-form';
import FormField from '@/components/FormField/FormField';
import type { FormSchemaData } from '@/schemas/formSchema';

interface ConfirmPasswordFieldProps {
  error?: string;
  register?: UseFormRegister<FormSchemaData>;
}

const ConfirmPasswordField = ({
  error,
  register,
}: ConfirmPasswordFieldProps) => (
  <FormField id="confirmPassword" label="Confirm Password" error={error}>
    <input
      id="confirmPassword"
      name="confirmPassword"
      type="password"
      placeholder="Confirm your password"
      {...register?.('confirmPassword')}
      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    />
  </FormField>
);

export default ConfirmPasswordField;
