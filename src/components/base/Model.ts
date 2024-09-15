//подключаем механизм событий в класс модели
import { IEvents } from './Events';

export const isModel = (obj: unknown): obj is Model<any> => {
	return obj instanceof Model;
};

//Определяем базовую структуру всех моделей приложения
export abstract class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}

	//Этот метод отправляет событие, уведомляющее о том, что произошли изменения в модели
	emitChanges(event: string, payload?: object) {
		//отправка события чтобы другие компоненты могли узнать о произошедших изменениях в модели.
		this.events.emit(event, payload ?? {});
	}
}
