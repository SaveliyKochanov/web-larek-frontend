type PaymentType = 'online' | 'received';

export interface IProduct {
	id: string;
	title: string;
	description: string;
	price: number | null;
	category: string;
	image: string;
}

export interface IBusket {
	productList: IProduct[];
	total: number | null;
}

export interface IBusketItem extends IBusket {
	id: number;
	title: string;
	price: number | null;
}

export interface IOrder {
	products: IProduct[];
	total: number;
	payment: PaymentType;
	address: string;
	phone: string;
}

export interface ICustomerData {
	email: string;
	phone: string;
}

export interface AppState {
	products: IProduct[];
	selectedProduct: IProduct;

	addProduct(product: IProduct): void;
	deleteProduct(productId: string): void;
	selectProduct(product: IProduct): void;
}

export interface IAppAPI {
	getProducts: () => Promise<IProduct[]>;
	getProduct: (id: string) => Promise<IProduct>;
}
