import type { UseFormRegister } from 'react-hook-form';
import FormField from '@/components/FormField/FormField';
import type { FormSchemaData } from '@/schemas/formSchema';

interface EmailFieldProps {
  error?: string;
  register?: UseFormRegister<FormSchemaData>;
}

const EmailField = ({ error, register }: EmailFieldProps) => (
  <FormField id="email" label="Email" error={error}>
    <input
      id="email"
      name="email"
      type="text"
      placeholder="Enter your email"
      {...register?.('email')}
      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    />
  </FormField>
);

export default EmailField;
