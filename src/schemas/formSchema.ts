import z from 'zod';
import { GENDER_OPTIONS } from '@/constants/genderOptions';
import {
  MAX_IMAGE_SIZE,
  MIN_PASSWORD_LENGTH,
  ALLOWED_IMAGE_TYPES,
} from '@/constants/formConstants';

export const FormSchema = z
  .object({
    name: z
      .string()
      .min(1, { error: 'Name is required' })
      .refine((nameValue) => nameValue.startsWith(nameValue[0].toUpperCase()), {
        error: 'First letter must be uppercase, for example: "Mark"',
      }),

    age: z
      .number({ error: 'Age must be a number' })
      .nonnegative({ error: 'Age must be 0 or greater' }),

    email: z
      .string()
      .min(1, { error: 'Email is required' })
      .superRefine((val, ctx) => {
        const parts = val.split('@');

        if (parts.length !== 2) {
          ctx.addIssue({
            code: 'custom',
            message: 'Email must contain exactly one @',
            input: val,
          });
          return;
        }

        const [local, domain] = parts;

        if (!local) {
          ctx.addIssue({
            code: 'custom',
            message: 'Local part before @ cannot be empty',
            input: val,
          });
        }

        if (!domain.includes('.')) {
          ctx.addIssue({
            code: 'custom',
            message: 'Domain must contain at least one dot',
            input: val,
          });
        }
      }),

    gender: z.enum(GENDER_OPTIONS, {
      error: 'Please select a gender',
    }),

    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, {
        error: 'Password must be at least 6 characters',
      }),

    confirmPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, { error: 'Please confirm your password' }),

    image: z
      .file({ error: 'Image is required' })
      .mime(ALLOWED_IMAGE_TYPES, {
        error: 'Only PNG and JPEG images are allowed',
      })
      .max(MAX_IMAGE_SIZE, { error: 'Image size must not exceed 10MB' }),

    country: z.string().min(1, { error: 'Country is required' }),

    isTermsAccepted: z.literal(true, {
      error: 'You must accept the Terms & Conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormData = z.infer<typeof FormSchema>;
