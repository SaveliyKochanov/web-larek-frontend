type PaymentType = 'online' | 'received';

export interface IProduct {
	id: string;
	title: string;
	description: string;
	price: number | null;
	category: string;
	image: string;
}

// export interface ICustomer {
// 	email: string;
// 	phone: string;
// 	payment: PaymentType;
// 	address: string;
// }

export interface IProductsData {
	products: IProduct[];
	preview: string | null;
	setProducts(products: IProduct[]): void;
	getProducts(): IProduct[];
	getProduct(id: string): IProduct;
	savePreview(product: IProduct): void;
}

export interface IBasketData {
	products: TProductBasket[];
	addToBasket(product: IProduct): void;
	deleteFromBasket(product: IProduct): void;
	getCardIndex(product: IProduct): number;
	clearBasket(): void;
}

export interface IOrderData {}

export interface IForm {
	valid: boolean;
	errors: string[];
}

export interface IOrder {
	total: number;
	items: string[];
	email: string;
	phone: string;
	address: string;
	payment: string;
}

export type TOrderPayment = Pick<IOrder, 'payment' | 'address'>;
export type TOrderContact = Pick<IOrder, 'email' | 'phone'>;

export type TProductBasket = Pick<IProduct, 'id' | 'title' | 'price'>;

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
