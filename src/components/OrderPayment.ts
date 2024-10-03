import { TOrderContact, TOrderPayment } from '../types';
import { IEvents } from './base/events';
import { Form } from './common/Form';

export class OrderPayment extends Form<TOrderPayment> {
	protected _buttonOnline: HTMLButtonElement;
	protected _buttonOnReceipt: HTMLButtonElement;
	protected _address: HTMLInputElement;

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
		this._address = container.querySelector(
			'input[name="address"]'
		) as HTMLInputElement;
		this._buttonOnline = container.querySelector(
			'button[name="card"]'
		) as HTMLButtonElement;
		this._buttonOnReceipt = container.querySelector(
			'button[name="cash"]'
		) as HTMLButtonElement;

		if (this._buttonOnline) {
			this._buttonOnline.addEventListener('click', () => {
				events.emit('order:changed', {
					payment: this._buttonOnline.name,
					button: this._buttonOnline,
				});
			});
		}

		if (this._buttonOnReceipt) {
			this._buttonOnReceipt.addEventListener('click', () => {
				events.emit('order:changed', {
					payment: this._buttonOnReceipt.name,
					button: this._buttonOnReceipt,
				});
			});
		}
	}

	set address(value: string) {
		this._address.value = value;
	}

	togglePayment(value: HTMLElement) {
		this.resetPayment();
		this.toggleClass(value, 'button_alt-active', true);
	}

	resetPayment() {
		this.toggleClass(this._buttonOnReceipt, 'button_alt-active', false);
		this.toggleClass(this._buttonOnline, 'button_alt-active', false);
	}
}


