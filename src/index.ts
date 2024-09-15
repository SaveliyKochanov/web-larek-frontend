import { EventEmitter, IEvents } from './components/base/Events';
import { IApi, IProduct } from './types/index';
// import { AppState } from './components/AppData';
import { Card } from './components/Card';
import { Page } from './components/Page';
import { ProductsData } from './components/ProductsData';
import { WebAPI } from './components/WebApi';
import { Api } from './components/base/Api';
import { Modal } from './components/common/Modal';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const events: IEvents = new EventEmitter();
const baseApi: IApi = new Api(API_URL);
const api = new WebAPI(CDN_URL, baseApi);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const modalTemplate = ensureElement<HTMLFormElement>('#modal-container');
const pageBody = document.body;

const page = new Page(pageBody, events);
//поменять названия

const productsData = new ProductsData(events);
const modal = new Modal(modalTemplate, events);

api.getProducts().then((response) => {
	if (Array.isArray(response)) {
		productsData.setProducts(response);
	} else {
		console.error('Получены не массив данных:', response);
	}
});

events.on('cards:changed', () => {
	// page.counter = productsData.basket.length;
	page.catalog = productsData.products.map((product) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => {
				events.emit('card:selected', product);
			},
		});
		return card.render(product);
	});
});

events.on('card:selected', (product: IProduct) => {
	productsData.savePreview(product);
});

events.on('preview:changed', (product: IProduct) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			events.emit('card:basket', product);
			events.emit('preview:changed', product);
			// modal.close();
		},
	});
});
