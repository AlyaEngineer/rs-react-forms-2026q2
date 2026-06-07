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

interface UncontrolledFormProps {
  onClose: () => void;
}

const UncontrolledForm = ({ onClose }: UncontrolledFormProps) => {
  return (
    <form className="space-y-1">
      <NameField />
      <AgeField />
      <EmailField />
      <GenderField />
      <CountryField />
      <ImageField />
      <PasswordField />
      <ConfirmPasswordField />
      <TermsField />

      <FormActions onCancel={onClose} />
    </form>
  );
};

export default UncontrolledForm;
