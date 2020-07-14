import axios from 'axios';

const api = axios.create({
	baseURL: 'https://jackhair.barber.com.br',
});

export default api;
