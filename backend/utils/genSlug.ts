import slugify from 'slugify';

export const genSlug = (title: string) => {
  const date = new Date().toISOString();
  return (
    slugify(title, {
      lower: true,
      trim: true,
      strict: true,
    }) + date
  );
};
