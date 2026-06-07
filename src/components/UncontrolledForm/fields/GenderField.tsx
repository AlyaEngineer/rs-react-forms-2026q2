import FormField from '@/components/FormField/FormField';
import { GENDER_OPTIONS } from '@/constants/genderOptions';

const GenderField = ({ error }: { error?: string }) => (
  <FormField id="gender" label="Gender" error={error}>
    <select
      id="gender"
      name="gender"
      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    >
      <option value="">Select gender</option>
      {GENDER_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </FormField>
);

export default GenderField;
