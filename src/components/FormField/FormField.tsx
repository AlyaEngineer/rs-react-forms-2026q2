import ErrorField from '@/components/ErrorField/ErrorField';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

const FormField = ({ id, label, error, children }: FormFieldProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      <ErrorField error={error} />
    </div>
  );
};

export default FormField;
