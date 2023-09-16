import axios from 'axios';

const baseUrl = 'https://restcountries.com/v3.1/all';

const countriesAPI = {
  getAll: () => axios.get(baseUrl).then((response) => response.data),
};

export default countriesAPI;
