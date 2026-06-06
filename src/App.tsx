import OpenFormButton from '@/components/OpenFormButton/OpenFormButton';

const App = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">
          React Forms
        </h1>

        <div className="flex justify-center gap-8">
          <OpenFormButton title="Uncontrolled Form" formType="uncontrolled" />
          <OpenFormButton title="React Hook Form" formType="rhf" />
        </div>
      </div>
    </main>
  );
};

export default App;
