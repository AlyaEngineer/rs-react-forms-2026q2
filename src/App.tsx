import { useAppSelector } from '@/store/store';
import { selectSubmissions } from '@/store/submissionsSlice/submissionsSlice.selectors';
import OpenFormButton from '@/components/OpenFormButton/OpenFormButton';
import FormCard from '@/components/FormCard/FormCard';

const App = () => {
  const submissions = useAppSelector(selectSubmissions);

  const uncontrolled = submissions.filter((s) => s.formType === 'uncontrolled');
  const rhf = submissions.filter((s) => s.formType === 'rhf');

  const latestUncontrolledId = uncontrolled[0]?.id;
  const latestRhfId = rhf[0]?.id;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">
        React Forms
      </h1>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <OpenFormButton title="Uncontrolled Form" formType="uncontrolled" />
          {uncontrolled.map((submission) => (
            <FormCard
              key={submission.id}
              submission={submission}
              isNew={submission.id === latestUncontrolledId}
            />
          ))}
        </div>

        <div className="space-y-4">
          <OpenFormButton title="React Hook Form" formType="rhf" />
          {rhf.map((submission) => (
            <FormCard
              key={submission.id}
              submission={submission}
              isNew={submission.id === latestRhfId}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default App;
