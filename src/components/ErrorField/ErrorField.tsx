interface ErrorFieldProps {
  error?: string;
}

const ErrorField = ({ error }: ErrorFieldProps) => (
  <p className="mt-1 min-h-5 text-sm text-red-500">{error ?? ''}</p>
);

export default ErrorField;
