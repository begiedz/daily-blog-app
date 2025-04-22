import axios from 'axios';
import config from '../appconfig.json';
import { handleApiNotify } from './utils';

export const getAffirmation = async () => {
  try {
    const response = await axios.get(`${config.serverUrl}/Affirmation/random`);
    return response.data.affirmation;
  } catch (err) {
    handleApiNotify(err);
  }
};

export const getRates = async () => {
  try {
    const response = await axios.get(
      `${config.serverUrl}/Currency/currency-rates`,
    );
    return response.data;
  } catch (err) {
    handleApiNotify(err);
  }
};
