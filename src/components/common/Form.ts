import { IForm } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Form<T> extends Component<IForm> {
	protected _errors: HTMLElement;
	protected _submitButton: HTMLButtonElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submitButton = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		this.container.addEventListener('input', ({ target }) => {
			const { name, value } = target as HTMLInputElement;
			this.onInputChange(name as keyof T, value);
		});

		this.container.addEventListener('submit', (e) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	set valid(value: boolean) {
		this._submitButton.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}

	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`order.${field.toString()}:changed`, {
			field,
			value,
		});
	}

	render(state: Partial<T> & IForm) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
