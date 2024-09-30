import { ICardActions, TProductBasket } from '../types';
import { createElement, ensureElement } from '../utils/utils';
import { Component } from './base/Component';

export interface IBasket {
	items: TProductBasket[];
	total: number | null;
}

export class Basket extends Component<IBasket> {
	protected _catalog: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._catalog = ensureElement<HTMLElement>(`.basket__list`, this.container);
		this._price = ensureElement<HTMLElement>(`.basket__price`, this.container);
		this._button = container.querySelector(`.basket__button`);

		this.items = [];
	}

	set price(value: number) {
		this._price.textContent = value + ' синапсов';
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._catalog.replaceChildren(...items);
			this.setDisabled(this._button, false);
		} else {
			this._catalog.replaceChildren(
				createElement('p', { textContent: 'Товары еще не добавлены в корзину' })
			);
			this.setDisabled(this._button, true);
		}
	}
}
