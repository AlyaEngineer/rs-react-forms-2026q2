import FormField from '@/components/FormField/FormField';
import { useAppSelector } from '@/store/store';
import { selectCountries } from '@/store/countriesSlice/countriesSlice.selectors';

const CountryField = ({ error }: { error?: string }) => {
  const countries = useAppSelector(selectCountries);

  return (
    <FormField id="country" label="Country" error={error}>
      <select
        id="country"
        name="country"
        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      >
        <option value="">Select country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </FormField>
  );
};

export default CountryField;
