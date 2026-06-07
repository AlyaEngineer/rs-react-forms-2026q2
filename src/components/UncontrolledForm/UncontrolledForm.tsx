import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addSubmission } from '@/store/submissionsSlice/submissionsSlice';
import { selectCountries } from '@/store/countriesSlice/countriesSlice.selectors';
import { createFormSchema } from '@/schemas/formSchema';
import { imageToBase64 } from '@/utils/imageToBase64';

import AgeField from './fields/AgeField';
import ConfirmPasswordField from './fields/ConfirmPasswordField';
import CountryField from './fields/CountryField';
import EmailField from './fields/EmailField';
import GenderField from './fields/GenderField';
import ImageField from './fields/ImageField';
import NameField from './fields/NameField';
import PasswordField from './fields/PasswordField';
import TermsField from './fields/TermsField';
import FormActions from '@/components/FormActions/FormActions';
import type { FieldErrors, FormField } from '@/types/formTypes';

interface UncontrolledFormProps {
  onClose: () => void;
}

const UncontrolledForm = ({ onClose }: UncontrolledFormProps) => {
  const dispatch = useAppDispatch();
  const allowedCountries = useAppSelector(selectCountries);
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const schema = createFormSchema(allowedCountries);
    const rawData = new FormData(e.currentTarget);

    const imageFile = rawData.get('image');

    const data = {
      name: rawData.get('name'),
      age: rawData.get('age'),
      email: rawData.get('email'),
      gender: rawData.get('gender'),
      password: rawData.get('password'),
      confirmPassword: rawData.get('confirmPassword'),
      image: imageFile instanceof File ? imageFile : undefined,
      country: rawData.get('country'),
      isTermsAccepted: rawData.get('isTermsAccepted') === 'on',
    };

    const result = schema.safeParse(data);

    if (!result.success) {
      const newErrors: FieldErrors = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as FormField;
        newErrors[fieldName] = issue.message;
      });

      setErrors(newErrors);
      return;
    }

    setErrors({});

    const image = await imageToBase64(result.data.image);

    dispatch(
      addSubmission({
        id: crypto.randomUUID(),
        submittedAt: Date.now(),
        ...result.data,
        image,
      })
    );
    onClose();
  };

  return (
    <form
      className="space-y-1"
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
    >
      <NameField error={errors.name} />
      <AgeField error={errors.age} />
      <EmailField error={errors.email} />
      <GenderField error={errors.gender} />
      <CountryField error={errors.country} />
      <ImageField error={errors.image} />
      <PasswordField error={errors.password} />
      <ConfirmPasswordField error={errors.confirmPassword} />
      <TermsField error={errors.isTermsAccepted} />

      <FormActions onCancel={onClose} />
    </form>
  );
};

export default UncontrolledForm;
