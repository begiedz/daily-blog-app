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
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s.-]/g, '') // delete not allowed chars
    .replace(/\s+/g, '-') // spaces -> hyphens
    .replace(/-+/g, '-') // multi hyphens -> one
    .replace(/^-+|-+$/g, ''); // delete hyphens at the beginning and the end
  return slug;
};
