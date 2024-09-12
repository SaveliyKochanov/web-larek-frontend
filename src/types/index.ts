type PaymentType = 'online' | 'received';

export interface IProduct {
	id: string;
	title: string;
	description: string;
	price: number | null;
	category: string;
	image: string;
}

export interface ICustomer {
	email: string;
	phone: string;
	payment: PaymentType;
	address: string;
}

export interface IProductsData {
	products: IProduct[];
	preview: string | null; //Для сохранения карточки, которую будем открывать
	getProducts(): IProduct[];
	getProduct(id: string): IProduct;
	saveProduct(product: IProduct): void;
	savePreview(id: string): void;
}

export type TProductBasket = Pick<IProduct, 'id' | 'title' | 'price'>;
// export interface IOrderData {
// 	payment: PaymentType;
// 	address: string;
// }
