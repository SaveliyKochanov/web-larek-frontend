import { IBasketData, TProductBasket } from '../types';
import { IEvents } from './base/Events';

export class BasketData implements IBasketData {
	protected _products: TProductBasket[] = [];
	// protected events: IEvents;

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

	getBasketPrice() {
		let total = 0;
		this._products.map((elem) => {
			total += elem.price;
		});
		return total;
		// return this._products.reduce((total, card) => total + card.price, 0);
	}

	getBasketQuantity() {
		return this._products.length;
	}
	clearBasket() {
		this._products = [];
		this.events.emit('basket:changed');
	}
}
