import { IProduct, IProductsData } from '../types';
import { IEvents } from './base/Events';

export class ProductsData implements IProductsData {
	protected _products: IProduct[] = [];
	protected _preview: string | null = null;

	constructor(protected events: IEvents) {
		this.events = events;
	}

	get products(): IProduct[] {
		return this._products;
	}
	setProducts(products: IProduct[]) {
		this._products = products;
		this.events.emit('cards:changed');
	}

	getProducts() {
		return this._products;
	}

	addProduct(product: IProduct) {
		this._products = [product, ...this._products];
	}

	getProduct(id: string) {
		return this._products.find((product) => product.id === id) || null;
	}

	savePreview(product: IProduct) {
		this._preview = product.id;
		this.events.emit('preview:changed', product);
	}

	get preview(): string | null {
		return this._preview;
	}
}
