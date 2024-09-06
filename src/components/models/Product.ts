import { IProduct } from '../../types'
import { Api } from '../base/api'

export class Product {
	protected _id: string;
	protected title: string

	constructor(api: Api) {
			this.api = api;
	}

	async getProducts(): Promise<IProduct[]> {
			return this.api.get('/products')
					.then((data: { items: IProduct[] }) => data.items)
					.catch(error => {
							console.error('Error fetching products:', error);
							return [];
					});
	}
}

export interface IProduct {
	id: string;
	title: string;
	description: string;
	price: number | null;
	category: string;
	image: string;
}