export const GENDER_OPTIONS = [
  'Male',
  'Female',
  'Non-binary',
  'Prefer not to say',
] as const;

export type Gender = (typeof GENDER_OPTIONS)[number];
