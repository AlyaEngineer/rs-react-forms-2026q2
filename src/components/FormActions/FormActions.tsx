import Button from '@/components/Button/Button';

interface FormActionsProps {
  onCancel: () => void;
}

const FormActions = ({ onCancel }: FormActionsProps) => {
  return (
    <div className="mt-6 flex items-center justify-end gap-x-6">
      <Button type="button" variant="secondary" onClick={onCancel}>
        Cancel
      </Button>

      <Button type="submit">Submit</Button>
    </div>
  );
};

export default FormActions;
