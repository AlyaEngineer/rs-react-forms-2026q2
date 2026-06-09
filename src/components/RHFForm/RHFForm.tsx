import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addSubmission } from '@/store/submissionsSlice/submissionsSlice';
import { selectCountries } from '@/store/countriesSlice/countriesSlice.selectors';
import { createFormSchema } from '@/schemas/formSchema';
import { imageToBase64 } from '@/utils/imageToBase64';
import type { FormSchemaData } from '@/schemas/formSchema';
import AgeField from '../fields/AgeField';
import ConfirmPasswordField from '../fields/ConfirmPasswordField';
import CountryField from '../fields/CountryField';
import EmailField from '../fields/EmailField';
import GenderField from '../fields/GenderField';
import ImageField from '../fields/ImageField';
import NameField from '../fields/NameField';
import PasswordField from '../fields/PasswordField';
import TermsField from '../fields/TermsField';
import FormActions from '@/components/FormActions/FormActions';

interface RHFFormProps {
  onClose: () => void;
}

const RHFForm = ({ onClose }: RHFFormProps) => {
  const dispatch = useAppDispatch();
  const allowedCountries = useAppSelector(selectCountries);
  const schema = createFormSchema(allowedCountries);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<FormSchemaData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      age: '',
      email: '',
      gender: undefined,
      country: '',
      image: undefined,
      password: '',
      confirmPassword: '',
      isTermsAccepted: false,
    },
  });

  const password = useWatch({ control, name: 'password', defaultValue: '' });

  const onSubmit = async (data: FormSchemaData) => {
    const image = await imageToBase64(data.image);

    dispatch(
      addSubmission({
        id: crypto.randomUUID(),
        submittedAt: Date.now(),
        formType: 'rhf',
        ...data,
        image,
      })
    );
    reset();
    onClose();
  };

  return (
    <form
      className="space-y-1"
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
    >
      <NameField error={errors.name?.message} register={register} />
      <AgeField error={errors.age?.message} register={register} />
      <EmailField error={errors.email?.message} register={register} />
      <GenderField error={errors.gender?.message} register={register} />
      <CountryField error={errors.country?.message} register={register} />
      <Controller
        control={control}
        name="image"
        render={({ field: { onChange } }) => (
          <ImageField
            error={errors.image?.message}
            onChange={(file: File) => {
              onChange(file);
            }}
          />
        )}
      />

      <PasswordField
        error={errors.password?.message}
        register={register}
        password={password}
      />
      <ConfirmPasswordField
        error={errors.confirmPassword?.message}
        register={register}
      />
      <TermsField error={errors.isTermsAccepted?.message} register={register} />
      <FormActions onCancel={onClose} isSubmitDisabled={!isValid} />
    </form>
  );
};

export default RHFForm;
