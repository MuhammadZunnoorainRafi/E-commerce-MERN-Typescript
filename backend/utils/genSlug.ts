import slugify from 'slugify';

export const genSlug = (title: string) => {
  return slugify(title, {
    lower: true,
    trim: true,
    strict: true,
  });
};
