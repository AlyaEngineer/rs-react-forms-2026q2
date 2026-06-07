import ErrorField from '@/components/ErrorField/ErrorField';
import { useAppSelector } from '@/store/store';
import { selectCountries } from '@/store/countriesSlice/countriesSlice.selectors';

interface CountryFieldProps {
  error?: string;
}

const CountryField = ({ error }: CountryFieldProps) => {
  const countries = useAppSelector(selectCountries);

  return (
    <div>
      <label
        htmlFor="country"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Country
      </label>
      <div className="mt-2 grid grid-cols-1">
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
      </div>

      <ErrorField error={error} />
    </div>
  );
};

export default CountryField;
