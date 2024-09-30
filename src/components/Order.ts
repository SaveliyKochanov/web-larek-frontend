// import { IEvents } from './base/Events'

// export class Order extends Component<IOrder> {
// 	protected _buttonOnline: HTMLElement;
// 	protected _buttonOnReceipt: HTMLElement;
// 	protected _address: HTMLElement;

// 	//можно передавать template чтобы делать разные карточки
// 	constructor(container: HTMLElement, protected events: IEvents) {
// 		super(container, events);

// 		this._image = container.querySelector(`.card__image`);
// 		this._price = ensureElement<HTMLSpanElement>(`.card__price`, container);
// 		if (actions?.onClick) {
// 			if (this._button) {
// 				this._button.addEventListener('click', actions.onClick);
// 			} else {
// 				container.addEventListener('click', actions.onClick);
// 			}
// 		}
// 	}

// 	set id(value: string) {
// 		this.container.dataset.id = value;
// 	}

// 	get id(): string {
// 		return this.container.dataset.id || '';
// 	}

// 	set price(value: string) {
// 		if (value) {
// 			this.setText(this._price, `${value} синапсов`);
// 		} else {
// 			this.setText(this._price, 'Бесценно');
// 		}
// 	}
// }
