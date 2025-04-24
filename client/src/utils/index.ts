import { Dispatch, SetStateAction } from 'react';
import { IPost } from '../types';

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

export const openModal = (
  modalId: string,
  post: IPost,
  // setSelectedPost only for EditPostModal
  setter: Dispatch<SetStateAction<IPost | null>>,
) => {
  const modal = document.getElementById(modalId);
  if (modal) (modal as HTMLDialogElement).showModal();
  if (setter) {
    setter(post);
  }
};

export const closeModal = (name: string) => {
  const modal = document.getElementById(name);
  if (modal) (modal as HTMLDialogElement).close();
};
