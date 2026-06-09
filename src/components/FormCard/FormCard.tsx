import type { FormData } from '@/types/formTypes';

interface FormCardProps {
  submission: FormData;
  isNew: boolean;
}

const FormCard = ({ submission, isNew }: FormCardProps) => {
  return (
    <div
      className={`rounded-xl border p-4 shadow-sm ${
        isNew ? 'animate-highlight' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={submission.image}
          alt={submission.name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="text-sm text-gray-500">
          <p className="text-lg font-semibold text-gray-900">
            {submission.name}
          </p>
          <p>Email: {submission.email}</p>
          <p>Gender: {submission.gender}</p>
          <p>Age: {submission.age}</p>
          <p>Country: {submission.country}</p>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
