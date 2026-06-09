import Button from '@/components/Button/Button';

interface FormActionsProps {
  onCancel: () => void;
  isSubmitDisabled?: boolean;
}

const FormActions = ({
  onCancel,
  isSubmitDisabled = false,
}: FormActionsProps) => {
  return (
    <div className="mt-6 flex items-center justify-end gap-x-6">
      <Button type="button" variant="secondary" onClick={onCancel}>
        Cancel
      </Button>

      <Button type="submit" disabled={isSubmitDisabled}>
        Submit
      </Button>
    </div>
  );
};

export default FormActions;
