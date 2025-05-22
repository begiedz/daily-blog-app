import axios from 'axios';
import { serverUrl } from '../utils/config';
import { handleApiNotify } from './utils';

export const getAffirmation = async () => {
  try {
    const response = await axios.get(`${serverUrl}/Affirmation/random`);
    return response.data.affirmation;
  } catch (err) {
    handleApiNotify(err);
  }
};

export const getRates = async () => {
  try {
    const response = await axios.get(`${serverUrl}/Currency/currency-rates`);
    return response.data;
  } catch (err) {
    handleApiNotify(err);
  }
};
