import { IBasketData, IOrderData, TProductBasket } from '../types';
import { IEvents } from './base/Events';

export class BasketData implements IBasketData {
	protected _products: TProductBasket[] = [];

	constructor(protected events: IEvents) {
		this.events = events;
	}

	get products(): TProductBasket[] {
		return this._products;
	}

	addToBasket(product: TProductBasket) {
		this._products = [product, ...this._products];
		this.events.emit('basket:changed');
	}

	deleteFromBasket(product: TProductBasket) {
		this._products = this._products.filter(
			(_product) => _product.id !== product.id
		);
		this.events.emit('basket:changed');
	}

	isBasketCard(product: TProductBasket) {
		return !this.products.some((card) => card.id === product.id)
			? this.addToBasket(product)
			: this.deleteFromBasket(product);
	}

	getCardIndex(product: TProductBasket) {
		return this._products.indexOf(product) + 1;
	}

	getButtonStatus(product: TProductBasket) {
		return !this._products.some((card) => card.id === product.id)
			? 'Купить'
			: 'Убрать';
	}

	getBasketPrice() {
		let total = 0;
		this._products.map((elem) => {
			total += elem.price;
		});
		return total;
	}

	getBasketQuantity() {
		return this._products.length;
	}

	clearBasket() {
		this._products = [];
		this.events.emit('basket:changed');
	}

	sendBasketToOrder(orderData: IOrderData) {
		const orderItems = this._products.map((product) => product.id);

		orderData.setOrderField('items', orderItems);
		orderData.setOrderField('total', this.getBasketPrice());
	}
}
