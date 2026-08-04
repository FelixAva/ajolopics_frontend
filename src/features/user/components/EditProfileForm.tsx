import { useRef } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DynamicIcon } from 'lucide-react/dynamic';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import InputFile from '@/components/ui/InputFile';
import { useAuthStore } from '@/features/auth';
import type { IEditProfileFormInput } from '../types/user.forms.types';
import { redirect } from '@tanstack/react-router';

const EditProfileForm = () => {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation('components');

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IEditProfileFormInput>({
    values: {
      name: user?.name ?? '',
      media: [],
    },
  });

  // Profile persistence will be connected when the update mutation is available.
  const handleFormSubmit: SubmitHandler<IEditProfileFormInput> = () => undefined;

  if (!user) redirect({from: '/profile/$username/edit', to: '/auth'});

  return (
    <form
      aria-labelledby="edit-profile-title"
      className="mx-auto w-full max-w-4xl py-8 sm:py-12"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <header className="mb-6 sm:mb-8">
        <h1
          id="edit-profile-title"
          className="text-2xl font-semibold tracking-tight text-heading-foreground sm:text-3xl"
        >
          {t('profileEdit.title')}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-supporting-foreground sm:text-base">
          {t('profileEdit.description')}
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-surface-border bg-card shadow-sm">
        <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)] md:gap-10">
          <fieldset className="flex min-w-0 flex-col items-center text-center">
            <legend className="mb-4 w-full text-left text-lg font-semibold text-strong-foreground md:text-center">
              {t('profileEdit.pictureLegend')}
            </legend>

            <Controller
              name="media"
              control={control}
              render={({ field }) => {
                const selectedPicture = field.value?.at(-1)?.previewUrl;

                return (
                  <>
                    <Button
                      type="button"
                      variant="none"
                      size="none"
                      className="group relative size-40! shrink-0 overflow-hidden rounded-full! border-4! border-card! bg-surface-muted! shadow-md ring-1 ring-surface-border transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary-ring sm:size-48!"
                      onClick={() => photoInputRef.current?.click()}
                      aria-label={t('fileUpload.changeProfilePicture')}
                      aria-describedby="profile-picture-hint"
                    >
                      <img
                        src={selectedPicture ?? 'https://placehold.net/avatar.png'}
                        alt=""
                        className="size-full rounded-full object-cover transition-[filter,transform] duration-200 group-hover:scale-105 group-hover:brightness-75 group-focus-visible:scale-105 group-focus-visible:brightness-75"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-overlay/0 transition-colors duration-200 group-hover:bg-overlay/40 group-focus-visible:bg-overlay/40"
                      >
                        <DynamicIcon
                          name="camera"
                          size={36}
                          className="text-overlay-foreground opacity-0 drop-shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                        />
                      </span>
                    </Button>

                    <InputFile
                      ref={photoInputRef}
                      accept="image/jpeg,image/png,image/webp"
                      value={field.value ?? []}
                      onBlur={field.onBlur}
                      onChange={(files) => field.onChange(files.slice(-1))}
                      className="hidden"
                    />
                  </>
                );
              }}
            />

            <p
              id="profile-picture-hint"
              className="mt-4 max-w-52 text-sm leading-5 text-subtle-foreground"
            >
              {t('profileEdit.pictureHint')}
            </p>
          </fieldset>

          <fieldset className="min-w-0">
            <legend className="mb-4 text-lg font-semibold text-strong-foreground">
              {t('profileEdit.detailsLegend')}
            </legend>

            <div className="flex flex-col gap-5">
              <Input
                id="profile-name"
                label={t('profileEdit.nameLabel')}
                autoComplete="name"
                error={errors.name?.message}
                {...register('name', {
                  required: t('validation.required', {
                    field: t('profileEdit.nameLabel'),
                  }),
                  minLength: {
                    value: 3,
                    message: t('validation.minLength', { min: 3 }),
                  },
                  maxLength: {
                    value: 100,
                    message: t('validation.maxLength', { max: 100 }),
                  },
                })}
              />

              <div className="flex w-full flex-col text-left">
                <span className="text-lg text-foreground">
                  {t('profileEdit.usernameLabel')}
                </span>
                <p className="rounded-lg border border-surface-border bg-surface-muted px-3 py-2 text-supporting-foreground">
                  @{user?.username}
                </p>
                <p className="mt-1 text-sm text-subtle-foreground">
                  {t('profileEdit.usernameHint')}
                </p>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="flex justify-end border-t border-surface-border bg-surface-muted/50 px-5 py-4 sm:px-8">
          <Button type="submit" className="w-full sm:w-auto">
            <DynamicIcon name="save" size={20} aria-hidden="true" />
            <span>{t('profileEdit.save')}</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
