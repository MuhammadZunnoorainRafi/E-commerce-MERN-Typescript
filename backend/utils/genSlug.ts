export const genSlug = () => {
  const date = new Date().toISOString().replace(/[:.]/g, '-').toLowerCase();
  return date;
};
