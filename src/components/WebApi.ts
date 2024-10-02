import { IOrder, IProduct } from '../types';
import { IApi } from './../types/index';
import { ApiListResponse } from './base/Api';

export class WebAPI {
	private _baseApi: IApi;
	private cdn: string;

	constructor(cdn: string, baseApi: IApi) {
		this._baseApi = baseApi;
		this.cdn = cdn;
	}

	getProducts(): Promise<IProduct[]> {
		return this._baseApi
			.get<ApiListResponse<IProduct>>(`/product`)
			.then((response) =>
				response.items.map((product) => ({
					...product,
					image: this.cdn + product.image,
				}))
			);
	}

	getProduct(id: string): Promise<IProduct> {
		return this._baseApi.get<IProduct>(`/product/${id}`).then((product) => ({
			...product,
			image: this.cdn + product.image,
		}));
	}

	orderProducts(order: IOrder): Promise<IOrder> {
		return this._baseApi
			.post<IOrder>(`/order`, order)
			.then((data: IOrder) => data);
	}
}
