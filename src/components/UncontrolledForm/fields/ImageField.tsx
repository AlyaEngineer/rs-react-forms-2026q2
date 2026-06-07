import ErrorField from '@/components/ErrorField/ErrorField';

interface ImageFieldProps {
  error?: string;
}

const ImageField = ({ error }: ImageFieldProps) => {
  return (
    <div>
      <label
        htmlFor="image"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Image
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-8">
        <div className="text-center">
          <div className="mt-4 flex justify-center text-sm/6 text-gray-600">
            <label
              htmlFor="image"
              className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/png, image/jpeg"
                className="sr-only"
              />
            </label>
          </div>
          <p className="text-xs/5 text-gray-600">PNG, JPG up to 10MB</p>
        </div>
      </div>

      <ErrorField error={error} />
    </div>
  );
};

export default ImageField;
