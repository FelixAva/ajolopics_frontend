import {
  object,
  ref,
  string,
  type InferType,
} from 'yup';
import type { TFunction } from 'i18next';

export const createLoginSchema = (t: TFunction) => object({
  email: string()
    .required(t('components:validation.required', { field: t('auth:fields.email') }))
    .max(255, t('components:validation.maxLength', { max: 255 }))
    .email(t('components:validation.emailPattern')),
  password: string()
    .required(t('components:validation.required', { field: t('auth:fields.password') }))
    .min(8, t('components:validation.minLength', { min: 8 })),
});

export const createRegisterSchema = (t: TFunction) => object({
  name: string()
    .required(t('components:validation.required', { field: t('auth:fields.name') }))
    .min(3, t('components:validation.minLength', { min: 3 }))
    .max(100, t('components:validation.maxLength', { max: 100 })),
  email: string()
    .required(t('components:validation.required', { field: t('auth:fields.email') }))
    .max(255, t('components:validation.maxLength', { max: 255 }))
    .email(t('components:validation.emailPattern')),
  password: string()
    .required(t('components:validation.required', { field: t('auth:fields.password') }))
    .min(8, t('components:validation.minLength', { min: 8 }))
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, t('components:validation.passwordPattern')),
  confPassword: string()
    .required(t('components:validation.required', { field: t('auth:fields.confirmPassword') }))
    .oneOf([ref('password')], t('components:validation.passwordsMatch')),
});

export type LoginSchema = InferType<ReturnType<typeof createLoginSchema>>;
export type RegisterSchema = InferType<ReturnType<typeof createRegisterSchema>>;
