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

Товар

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

Покупатель

```
export interface ICustomerData {
	email: string;
	phone: string;
	payment: PaymentType;
	address: string;
}
```

Интерфейс для модели данных продуктов

```
export interface IProductsData {
	products: IProduct[];
	preview: string | null;
}
```

## Архитектура

Проект построен по шаблону(паттерну) проектирования **`MVP`**. _Model-View-Presenter_ — это широко распространенный шаблон проектирования, который помогает разработчикам создавать поддерживаемые, тестируемые и масштабируемые серверные приложения, разделяя задачи управления данными, пользовательского интерфейса и логики приложения. По нему приложение делится на три слоя:

1)**`Model`** — отвечает за логику работы с данными. Взаимодействует с API для получения и изменения данных.\
2)**`View`** — отвечает за отображение данных и пользовательский интерфейс.\
3)**`Presenter`** (_EventEmitter_) — управляет взаимодействием между моделью и представлением. Реагирует на события интерфейса и изменяет модель.

### Базовый код

#### Класс `Api`

Данный класс предоставляет функции для взаимодействия с внешним API.
Класс содержит методы:

- `handleResponse` - Логика обработки ответа сервера, вынесенная в отдельную функцию.
- `get` - Функция принимающая url в качестве аргумента, и отправляющая get запрос на
- `post`

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
Контруктор класс принимает инстанс брокера событий. В полях класс хранятся следующие данные:

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

Реализует модальное окно. Предоставляет методы `open`, `close`, `render` для управления отображением модального окна. Устанавливает слушатели на клавиатуру, для закрытия модального окна по Esc, на клик в оверлей и кнопку крестик для закрытия попапа.
Конструктор принимает два аргумента:

- container - корневой элемент модального окна в DOM, переданный в качестве `HTMLElement`.
- events - объект, реализующий интерфейс `IEvents`
  Поля класса:
- \_closeButton: HTMLButtonElement - кнопка для закрытия модального окна
- \_content - контейнер для содержимого модального окна
- events - брокер событий
