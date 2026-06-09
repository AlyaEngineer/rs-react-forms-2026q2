import type { UseFormRegister } from 'react-hook-form';
import FormField from '@/components/FormField/FormField';
import { useAppSelector } from '@/store/store';
import { selectCountries } from '@/store/countriesSlice/countriesSlice.selectors';
import type { FormSchemaData } from '@/schemas/formSchema';

interface CountryFieldProps {
  error?: string;
  register?: UseFormRegister<FormSchemaData>;
}

const CountryField = ({ error, register }: CountryFieldProps) => {
  const countries = useAppSelector(selectCountries);

  return (
    <FormField id="country" label="Country" error={error}>
      <input
        id="country"
        name="country"
        list="countries"
        autoComplete="off"
        placeholder="Start typing a country..."
        {...register?.('country')}
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      />
      <datalist id="countries">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
    </FormField>
  );
};

export default CountryField;
