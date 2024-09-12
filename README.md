# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Инструкция по сборке и запуску

После клонирования проекта из репозитория нужно установить зависимости:

```
npm install
```

Для запуска проекта в режиме разработки выполнить команду:

```
npm run start
```

или

```
yarn
yarn start
```

## Сборка

Для сборки проекта в продакшен выполнить команду:

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных, используемые в приложении

- Товар

```
export interface IProduct {
	id: string;
	title: string;
	description: string;
	price: number | null;
	category: string;
	image: string;
}
```

---

- Покупатель

```
export interface ICustomerData {
	email: string;
	phone: string;
	payment: PaymentType;
	address: string;
}
```

- Интерфейс для модели данных продуктов

```
export interface IProductsData {
	products: IProduct[];
	preview: string | null;
}
```

## Архитектура

Проект построен по паттерну проектирования **`MVP`**.(_Model-View-Presenter_) — это широко распространенный шаблон проектирования, который помогает разработчикам создавать поддерживаемые, тестируемые и масштабируемые серверные приложения, разделяя задачи управления данными, пользовательского интерфейса и логики приложения. По нему приложение делится на три слоя:

1)**`Model`** — отвечает за логику работы с данными. Взаимодействует с _API_ для получения данных и их дальнейшего изменения.\
2)**`View`** — отвечает за отображение данных и пользовательский интерфейс.\
3)**`Presenter`** ( _EventEmitter_ ) — управляет взаимодействием между моделью и представлением. Реагирует на события интерфейса и изменяет модель.

### Базовый код

#### Класс `Api`

Этот код предоставляет основу для взаимодействия с сервером через _API_, поддерживая базовые методы работы с _HTTP_-запросами и обработки ответов.
Класс содержит методы:

- `handleResponse` - Логика обработки ответа сервера, вынесенная в отдельную функцию.
- `GET` - функция принимающая _url_ в качестве аргумента, и отправляющая на него _GET_-запрос.
- `POST` - функция принимающая _url_ , _data_ - объект с данными, представляющий собой тело запроса и метод передачи данных(по умолчанию _POST_).

#### Класс `EventEmitter`

Реализует паттерн "Наблюдатель" и позволяет подписываться на события и уведомлять подписчиков о наступлении события.
Класс имеет методы:

- `on` - для подписки на событие.
- `off` - для отписки от события.
- `emit` - уведомления подписчиков о наступлении события соответственно.
  Дополнительно были реализованы методы `onAll` и `offAll` - для подписки на все события и сброса всех подписчиков.

#### Класс `Component`

Представляет собой абстрактный класс, на основе которого базируются все остальные компоненты интерфейса. Он предоставляет общие методы для управления DOM-элементами, такие как переключение классов, установка текстового содержимого компонента или его изображения, управление видимостью и другие,

#### Класс `Model`

### Слой данных

#### Класс ProductsData

Класс отвечает за хранение данных товаров и логику работы с ними.
Конcтруктор класса принимает инстанс брокера событий. В полях класса хранятся следующие данные:

- \_products: IProduct[] - Массив объектов продуктов
- \_preview: string | null - id продукта, выбранного для просмотра
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

Так же класс предоставляет набор методов для взаимодействия с этими данными.

- getProducts(): IProduct[] - Возвращает массив товаров
- getProduct(id: string): IProduct - Возвращает один товар по его id
- saveProduct(product: IProduct): void - Метод для сохранения товаров
- savePreview(id: string): void - Метод для сохранения Preview

### Классы представления

Представление управляет отображением данных и обработкой событий пользовательского интерфейса, таких как клики на карточки товаров и кнопки.

#### Класс `Modal`

Реализует модальное окно. Предоставляет методы `open`, `close`, `render` для управления отображением модального окна. Устанавливает слушатели на клавиатуру, для закрытия модального окна по Esc, на клик в оверлей и кнопку крестик для закрытия модального окна.
Конструктор принимает два аргумента:

- container - корневой элемент модального окна в DOM, переданный в качестве `HTMLElement`.
- events - объект, реализующий интерфейс `IEvents`
  Поля класса:
- \_closeButton: HTMLButtonElement - кнопка для закрытия модального окна
- \_content - контейнер для содержимого модального окна
- events - брокер событий

#### Класс `Card`

Отвечает за отображение карточки, задавая в карточке данные категории, заголовка, изображения, цены и описания. Класс наследуется от родительского класса `Component` и используется для отображения карточек на странице сайта.
Поля класса содержат элементы разметки элементов карточки
Методы:

- setData(cardData: ICard) - заполняет атрибуты элементов карточки данными
- а также геттеры и сеттеры для свойств, отвечающих за данные карточки

#### Класс Catalog

Отвечает за отображение каталога с карточками на главной странице. Метод
`addCard(cardElement: HTMLElement)` для добавления карточек на страницу

### Слой коммуникации

#### Класс WebApi

Данный класс принимает в конструктор экземпляр класс Api и предоставляет методы реализующие взаимодействие с backend-частью приложения

## Взаимодействие компонентов

Код, описывающий взаимодействие слоя представления и слоя данных между собой и фактически выполняющий роль презентера, находится в файле `index.ts`
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков событий, описанных в `index.ts`
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий

_Список всех событий, которые могут генерироваться в системе:_\
_События изменения данных (генерируются классами моделей данных)_

- `cards:changed` - изменение массива карточек
- `card:selected` - должна провоцировать открытие модального окна карточки
- `modal:open` - открытие модального окна
- `modal:close` - закрытие модального окна
- `basket:open` - открываем интерфейс корзины
- `basket:close` - закрываем интерфейс корзины
- `basket:changed` - смена числа на счетчике товаров корзины, расположенной на главной странице, изменение суммы приобретенных товаров, изменение корзины
- `order:open` - открываем окно оформления заказа с первой формой
- `order:changed` - изменяем поля формы оформления заказа
- `order:submit` - переход на заполнение данных пользователя
- `order:validation` - событие, сообщающее о необходимости валидации формы оформления заказа
- `contacts:changed` - изменяем поля формы заполнения данных клиента
- `contacts:submit` - отправка _post_-запроса на сервер, открытие окна, уведомляющего об успешном оформлении заказа, а также очистка разметки корзины
