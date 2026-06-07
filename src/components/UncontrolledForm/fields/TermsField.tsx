import ErrorField from '@/components/ErrorField/ErrorField';

interface TermsFieldProps {
  error?: string;
}

const TermsField = ({ error }: TermsFieldProps) => {
  return (
    <div>
      <div className="flex gap-3">
        <div className="flex h-6 shrink-0 items-center">
          <div className="group grid size-4 grid-cols-1">
            <input
              id="isTermsAccepted"
              name="isTermsAccepted"
              type="checkbox"
              className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            />
            <svg
              viewBox="0 0 14 14"
              fill="none"
              className="pointer-events-none col-start-1 row-start-1 size-3.5 place-self-center stroke-white"
            >
              <path
                d="M3 8L6 11L11 3.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0 group-has-checked:opacity-100"
              />
            </svg>
          </div>
        </div>
        <div className="text-sm/6">
          <label
            htmlFor="isTermsAccepted"
            className="font-medium text-gray-900"
          >
            I accept the Terms & Conditions
          </label>
        </div>
      </div>
      
      <ErrorField error={error} />
    </div>
  );
};

export default TermsField;
