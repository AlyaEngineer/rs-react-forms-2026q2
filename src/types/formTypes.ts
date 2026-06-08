export type FormType = 'uncontrolled' | 'rhf';

export interface FormData {
  id: string;
  formType: FormType;
  name: string;
  age: number;
  email: string;
  gender: string;
  password: string;
  image: string;
  country: string;
  isTermsAccepted: boolean;
  submittedAt: number;
}

export type FormField =
  | 'name'
  | 'age'
  | 'email'
  | 'gender'
  | 'password'
  | 'confirmPassword'
  | 'image'
  | 'country'
  | 'isTermsAccepted';

export type FieldErrors = Partial<Record<FormField, string>>;
