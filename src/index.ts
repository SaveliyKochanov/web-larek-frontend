import { Api } from './components/base/api';
import './scss/styles.scss';
import { API_URL } from './utils/constants';

const contentElement = document.querySelector('');
const api = new Api(API_URL);

api
	.get('/product')
	.then((res) => {
		console.log(res);
	})
	.catch((error) => {
		console.log(error);
	});
