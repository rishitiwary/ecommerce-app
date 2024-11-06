// call api for fetching product datas
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com', // Fake Store API endpoint
});

export const fetchProducts = async () => {
  const response = await api.get('/products'); // Fetch products from Fake Store API
  return response.data;
};
