export type PaymentType = 'online' | 'received';

export interface IProduct {
	id: string;
	title: string;
	description: string;
	price: number | null;
	category: string;
	image: string;
}

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
	getButtonStatus(product: TProductBasket): string;
	getBasketPrice(): number;
	getBasketQuantity(): number;
	clearBasket(): void;
	sendBasketToOrder(orderData: IOrderData): void;
}

export interface IOrderData {
	formErrors: TFormErrors;
	order: IOrder;
	setOrderPayment(value: string): void;
	setOrderEmail(value: string): void;
	setOrderField(field: keyof TOrderInput, value: string): void;
	setOrderField(field: keyof IOrder, value: IOrder[keyof IOrder]): void;
	validateOrder(): boolean;
	clearOrder(): void;
}

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
export type TOrderInput = Pick<
	IOrder,
	'payment' | 'address' | 'email' | 'phone'
>;
export type TFormErrors = Partial<Record<keyof IOrder, string>>;

export type TProductBasket = Pick<IProduct, 'id' | 'title' | 'price'>;

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}
export interface ISuccessActions {
	onClick: () => void;
}

export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
