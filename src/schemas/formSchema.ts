import z from 'zod';
import { GENDER_OPTIONS } from '@/constants/genderOptions';
import {
  MAX_IMAGE_SIZE,
  MIN_PASSWORD_LENGTH,
  ALLOWED_IMAGE_TYPES,
} from '@/constants/formConstants';

export const createFormSchema = (allowedCountries: string[]) =>
  z
    .object({
      name: z
        .string()
        .min(1, { message: 'Name is required' })
        .refine(
          (nameValue) =>
            nameValue.length > 0 &&
            nameValue.startsWith(nameValue[0].toUpperCase()),
          {
            message: 'First letter must be uppercase, for example: "Mark"',
          }
        ),

      age: z
        .string({ message: 'Age is required' })
        .min(1, { message: 'Age is required' })
        .transform((val) => Number(val))
        .pipe(
          z
            .number({ message: 'Age must be a number' })
            .nonnegative({ message: 'Age must be 0 or greater' })
        ),

      email: z
        .string()
        .min(1, { message: 'Email is required' })
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
        message: 'Please select a gender',
      }),

      password: z.string().min(MIN_PASSWORD_LENGTH, {
        message: 'Password must be at least 6 characters',
      }),

      confirmPassword: z
        .string()
        .min(MIN_PASSWORD_LENGTH, { message: 'Please confirm your password' }),

      image: z
        .file({ message: 'Image is required' })
        .refine((file) => file.size > 0, { message: 'Image is required' })
        .mime(ALLOWED_IMAGE_TYPES, {
          message: 'Only PNG and JPEG images are allowed',
        })
        .max(MAX_IMAGE_SIZE, {
          message: `Image size must not exceed ${(MAX_IMAGE_SIZE / 1024 / 1024).toString()}MB`,
        }),

      country: z
        .string()
        .min(1, { message: 'Country is required' })
        .refine((val) => allowedCountries.includes(val), {
          message: 'Please select a valid country from the list',
        }),

      isTermsAccepted: z.literal(true, {
        message: 'You must accept the Terms & Conditions',
      }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          path: ['confirmPassword'],
          message: 'Passwords do not match',
        });
      }
    });
