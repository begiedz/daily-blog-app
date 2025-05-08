import { Dispatch, SetStateAction } from 'react';
import { IPost, IUser } from '../types';

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
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s.-]/gu, '') // delete not allowed chars
    .replace(/\s+/g, '-') // spaces -> hyphens
    .replace(/-+/g, '-') // multi hyphens -> one
    .replace(/^-+|-+$/g, ''); // delete hyphens at the beginning and the end
};

type ModalEntity = IPost | IUser;

export const openModal = <T extends ModalEntity>(
  modalId: string,
  item: T,
  setter: Dispatch<SetStateAction<T | null>>,
) => {
  const modal = document.getElementById(modalId);
  if (modal) (modal as HTMLDialogElement).showModal();
  setter(item);
};

export const closeModal = (name: string) => {
  const modal = document.getElementById(name);
  if (modal) (modal as HTMLDialogElement).close();
};
