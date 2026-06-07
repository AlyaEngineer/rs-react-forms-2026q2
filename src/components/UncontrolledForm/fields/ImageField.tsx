import { useState } from 'react';
import ErrorField from '@/components/ErrorField/ErrorField';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/constants/formConstants';

const ImageField = ({ error }: { error?: string }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const allowedExtensions = ALLOWED_IMAGE_TYPES.map((type) =>
    type.replace('image/', '').toUpperCase()
  ).join(', ');

  const maxSizeMb = MAX_IMAGE_SIZE / 1024 / 1024;

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
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mx-auto mb-4 h-24 w-24 object-cover"
            />
          )}
          <div className="flex justify-center text-sm/6 text-gray-600">
            <label
              htmlFor="image"
              className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500"
            >
              <span>{preview ? 'Change file' : 'Upload a file'}</span>
              <input
                id="image"
                name="image"
                type="file"
                accept={ALLOWED_IMAGE_TYPES.join(',')}
                className="sr-only"
                onChange={handleChange}
              />
            </label>
          </div>
          <p className="text-xs/5 text-gray-600">
            {allowedExtensions} up to {maxSizeMb}MB
          </p>
        </div>
      </div>
      <ErrorField error={error} />
    </div>
  );
};

export default ImageField;
