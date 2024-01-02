import slugify from 'slugify';

export const genSlug = (title: string) => {
  const date = new Date().toISOString().replace(/[:.]/g, '-');
  return (
    slugify(title, {
      lower: true,
      trim: true,
      strict: true,
    }) + date
  );
};
