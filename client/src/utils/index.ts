export function capitalize(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
export const arrayFromString = (strTags: string) => {
  return strTags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag !== '');
};

export const createSlug = (title: string) => {
  const slug = title.toLowerCase().replace(/\s+/g, '-');
  return slug;
};
