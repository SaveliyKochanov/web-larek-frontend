import { Basket } from './components/Basket';
import { BasketData } from './components/BasketData';
import { BasketCard, Card } from './components/Card';
import { Page } from './components/Page';
import { ProductsData } from './components/ProductsData';
import { WebAPI } from './components/WebApi';
import { Api } from './components/base/Api';
import { EventEmitter, IEvents } from './components/base/Events';
import { Modal } from './components/common/Modal';
import './scss/styles.scss';
import { IApi, IProduct } from './types/index';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const events: IEvents = new EventEmitter();
const baseApi: IApi = new Api(API_URL);
const api = new WebAPI(CDN_URL, baseApi);

const productsData = new ProductsData(events);
const basketData = new BasketData(events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const modalTemplate = ensureElement<HTMLTemplateElement>('#modal-container');
const body = document.body;

const page = new Page(body, events);

const modal = new Modal(modalTemplate, events);
const basket = new Basket(cloneTemplate(basketTemplate));
const orderForm = new Basket(cloneTemplate(orderTemplate));

api.getProducts().then((response) => {
	if (Array.isArray(response)) {
		productsData.setProducts(response);
	} else {
		console.error('Получен не массив данных:', response);
	}
});

events.on('cards:changed', () => {
	page.counter = basketData.products.length;
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
			modal.close();
		},
	});
	modal.render({
		content: card.render({
			id: product.id,
			title: product.title,
			image: product.image,
			description: product.description,
			price: product.price,
			category: product.category,
			// button: appData.getButtonStatus(item),
		}),
	});
});

events.on('card:basket', (product: IProduct) => {
	console.log('Добавление товара в корзину:', product);
	basketData.isBasketCard(product);
	console.log('Товар добавлен в корзину', basketData.products);
});

events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

events.on('basket:changed', () => {
	page.counter = basketData.products.length;
	basket.price = basketData.getBasketPrice();
	basket.items = basketData.products.map((basketCard) => {
		const newBasketCard = new BasketCard(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				basketData.deleteFromBasket(basketCard);
			},
		});

		return newBasketCard.render({
			title: basketCard.title,
			price: basketCard.price,
		});
	});
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

// events.on('order:open', () => {
// 	modal.render({
// 		content: orderForm.
// 	})
// });
