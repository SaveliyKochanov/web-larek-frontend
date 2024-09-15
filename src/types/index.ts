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
	setProducts(products: IProduct[]): void;
	getProducts(): IProduct[];
	getProduct(id: string): IProduct;
	saveProduct(product: IProduct): void;
	savePreview(product: IProduct): void;
}

export interface IBasket {
	items: TProductBasket[];
	total: number | null;
}

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

