import { useState } from 'react';
import Modal from '../Modal/Modal';
import UncontrolledForm from '../UncontrolledForm/UncontrolledForm';
import RHFForm from '../RHFForm/RHFForm';

type FormType = 'uncontrolled' | 'rhf';

interface OpenFormButtonProps {
  title: string;
  formType: FormType;
}

const FORM_COMPONENTS = {
  uncontrolled: UncontrolledForm,
  rhf: RHFForm,
} as const;

const OpenFormButton = ({ title, formType }: OpenFormButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const FormComponent = FORM_COMPONENTS[formType];

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {title}
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title={title}
        testId={`${formType}-modal`}
      >
        <FormComponent />
      </Modal>
    </>
  );
};

export default OpenFormButton;
