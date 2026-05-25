import type { LinkHTMLAttributes, MetaHTMLAttributes } from 'react';

import type { MediaVariant, Post } from '../types/post.types';
import { SITE_NAME, getCanonicalUrl } from '@/utils/seo';
import { getDefaultSeoDescription, getSeoTranslation } from '@/utils/seoTranslations';

type HeadMeta = MetaHTMLAttributes<HTMLMetaElement>;
type HeadLink = LinkHTMLAttributes<HTMLLinkElement>;

const getPostDescription = (post: Post) =>
  post.description?.trim()
  || getSeoTranslation('posts.fallbackDescription', { title: post.title });

const getShareVariant = (variants?: MediaVariant[]) =>
  variants?.find((variant) => variant.variant === 'MEDIUM')
  || variants?.find((variant) => variant.variant === 'ORIGINAL')
  || variants?.find((variant) => variant.variant === 'THUMBNAIL');

export const getPostCanonicalUrl = (postId: string) =>
  getCanonicalUrl(`/posts/${postId}`);

export const getPostShareImage = (post: Post) =>
  getShareVariant(post.assets[0]?.variants)?.url;

export const getFallbackPostHead = (postId: string): {
  meta: HeadMeta[];
  links: HeadLink[];
} => ({
  meta: [
    {
      title: SITE_NAME,
    },
    {
      name: 'description',
      content: getDefaultSeoDescription(),
    },
  ],
  links: [
    {
      rel: 'canonical',
      href: getPostCanonicalUrl(postId),
    },
  ],
});

export const getPostHead = (post: Post): {
  meta: HeadMeta[];
  links: HeadLink[];
} => {
  const canonicalUrl = getPostCanonicalUrl(post.id);
  const description = getPostDescription(post);
  const image = getPostShareImage(post);
  const meta: HeadMeta[] = [
    {
      title: `${post.title} | ${SITE_NAME}`,
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
      content: 'article',
    },
    {
      property: 'og:title',
      content: post.title,
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
      name: 'twitter:card',
      content: image ? 'summary_large_image' : 'summary',
    },
    {
      name: 'twitter:title',
      content: post.title,
    },
    {
      name: 'twitter:description',
      content: description,
    },
  ];

  if (image) {
    meta.push(
      {
        property: 'og:image',
        content: image,
      },
      {
        property: 'og:image:alt',
        content: post.title,
      },
      {
        name: 'twitter:image',
        content: image,
      },
    );
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
