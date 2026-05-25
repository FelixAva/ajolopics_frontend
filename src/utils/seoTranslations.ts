import i18n from '@/app/i18n';

type SeoTranslationOptions = Record<string, string | number | undefined>;

export const getSeoTranslation = (
  key: string,
  options?: SeoTranslationOptions,
) => i18n.t(`seo:${key}`, options);

export const getDefaultSeoDescription = () =>
  getSeoTranslation('default.description');
