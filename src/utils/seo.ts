import type { LinkHTMLAttributes, MetaHTMLAttributes } from 'react';
import { getDefaultSeoDescription } from './seoTranslations';

export const SITE_NAME = 'Ajolopics';
export const SITE_URL = 'https://ajolopics.com';
export const DEFAULT_SHARE_IMAGE = `${SITE_URL}/ajologo_frame.webp`;

type HeadMeta = MetaHTMLAttributes<HTMLMetaElement>;
type HeadLink = LinkHTMLAttributes<HTMLLinkElement>;

type SeoHeadOptions = {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
};

export const getCanonicalUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};

export const createSeoHead = ({
  title = SITE_NAME,
  description = getDefaultSeoDescription(),
  path,
  image = DEFAULT_SHARE_IMAGE,
  type = 'website',
  noIndex = false,
}: SeoHeadOptions): {
  meta: HeadMeta[];
  links: HeadLink[];
} => {
  const canonicalUrl = getCanonicalUrl(path);
  const fullTitle = title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`;
  const meta: HeadMeta[] = [
    {
      title: fullTitle,
    },
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:site_name',
      content: SITE_NAME,
    },
    {
      property: 'og:type',
      content: type,
    },
    {
      property: 'og:title',
      content: fullTitle,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:url',
      content: canonicalUrl,
    },
    {
      property: 'og:image',
      content: image,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: fullTitle,
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: image,
    },
  ];

  if (noIndex) {
    meta.push({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  return {
    meta,
    links: [
      {
        rel: 'canonical',
        href: canonicalUrl,
      },
    ],
  };
};
