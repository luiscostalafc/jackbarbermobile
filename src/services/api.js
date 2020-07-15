import axios from 'axios';

const api = axios.create({
	baseURL: 'http://jackhair.barber.com.br',
});

export default api;
