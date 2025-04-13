import axios from 'axios';
import { handleApiError } from './utils';

export const getAffirmation = async () => {
  try {
    const resposne = await axios.get(
      'http://localhost:5017/api/Affirmation/random',
    );
    return resposne.data;
  } catch (err) {
    handleApiError(err);
  }
};

export const getRates = async () => {
  try {
    const resposne = await axios.get(
      'http://localhost:5017/api/Currency/currency-rates',
    );
    return resposne.data;
  } catch (err) {
    handleApiError(err);
  }
};
