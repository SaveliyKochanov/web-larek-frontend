import { IOrder, IOrderData, IProduct } from '../types';
import { IEvents } from './base/Events';

export class OrderData implements IOrderData {
	protected _order: IOrder = {
		total: 0,
		items: [],
		email: '',
		phone: '',
		address: '',
		payment: '',
	};

	constructor(protected events: IEvents) {
		this.events = events;
	}

	// setBasketToOrder() {
	// 	this._order.items = this.basket.map((card) => card.id);
	// 	this._order.total = this.getBasketTotal();
	// }
	clearOrder() {
		this._order = {
			total: 0,
			items: [],
			email: '',
			phone: '',
			address: '',
			payment: '',
		};
	}
}
