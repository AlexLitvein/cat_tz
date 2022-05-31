import {
  createEntityAdapter,
  createSlice,
  configureStore,
  Store,
  EntityState,
} from "@reduxjs/toolkit";
import { ICat } from "./types";

// interface Book {
//   id: string;
//   title: string;
// }

/* createEntityAdapter() 
предоставляет стандартизированный способ хранения данных путем преобразования коллекции в форму { ids: [], entities: {} }. 
Кроме предопределения формы состояния, эта функция генерирует набор редукторов и селекторов, которые знают, как работать с такими данными.
По умолчанию createEntityAdapter() предполагает, что данные имеют уникальные идентификаторы в поле entity.id.
Если данные хранят идентификаторы в другом поле, можно передать аргумент selectId, возвращающий соответствующее поле.
Поскольку мы не указываем `selectId`, уникальным полем будет считаться `entity.id`
 */

/* Основное содержимое адаптера сущности
- это набор редукторов для добавления, обновления и удаления экземпляров из объекта состояния:
addOne - принимает единичную сущность и добавляет ее
addMany - принимает массив сущностей или объект определенной формы и добавляет их
setAll - принимает массив сущностей или объект определенной формы и заменяет контент существующих сущностей значениями из массива
removeOne - принимает единичное значение id и удаляет соответствуюую сущность, если она имеется
removeMany - принимает массив значений id и удаляет соответствующие сущности
updateOne - принимает "объект обновления", содержащий id сущности и объект с одним и более новыми значениями полей в поле changes, и выполняет поверхностное обновление соответствующей сущности
updateMany - принимает массив объектов обновления и выполняет поверхностное обновление соответствующих сущностей
upsertOne - принимает единичную сущность. Если сущность с указанным id существует, выполняется ее поверхностное обновление и объединение полей. Значения совпадающих полей перезаписываются. Если сущность с указанным id отсутствует, она добавляется
upsertMany - принимает массив сущностей или объект определенной формы и выполняет upsertOne для каждой сущности
 */
const catsAdapter = createEntityAdapter({
  // Сортируем массив с идентификаторами по заголовкам книг
  // Указывая тип параметров, ts опредедяет тип сущности в стате
  // sortComparer: (a: ICat, b: ICat) => a.id.localeCompare(b.id), // !!! последующее изменение ф-ии сравнения не применяется
  sortComparer: (a: ICat, b: ICat) => (a.id < b.id ? -1 : 1),
});

const catsSlice = createSlice({
  name: "cats",
  // По умолчанию `createEntityAdapter()` возвращает `{ ids: [], entities: {} }`
  // Для отслеживания 'loading' или других ключей, их необходимо инициализировать:
  // `getInitialState({ loading: false })`
  initialState: catsAdapter.getInitialState({
    loading: "idle",
  }),
  reducers: {
    catAdded: catsAdapter.addOne,
    catsLoading(state, action) {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    catsReceived(state, action) {
      if (state.loading === "pending") {
        catsAdapter.setAll(state, action.payload);
        state.loading = "idle";
      }
    },
    catUpdated: catsAdapter.updateOne,
  },
});

// export const {
//   catAdded: bookAdded,
//   catsLoading,
//   catsReceived,
//   catUpdated: bookUpdated,
// } = catsSlice.actions;

export const { catAdded, catsLoading, catsReceived, catUpdated } =
  catsSlice.actions;

export const store = configureStore({
  reducer: {
    cats: catsSlice.reducer,
  },
});

type MyState = ReturnType<typeof store.getState>;

// Проверяем начальное состояние
// console.log(store.getState().cats);
// {ids: [], entities: {}, loading: 'idle' }

export const catsSelectors = catsAdapter.getSelectors(
  (state: MyState) => state.cats
);

// store.dispatch(bookAdded({ id: "a", title: "First" }));
// console.log(store.getState().cats);
// {ids: ["a"], entities: {a: {id: "a", title: "First"}}, loading: 'idle' }

// store.dispatch(bookUpdated({ id: "a", changes: { title: "Second" } }));
// store.dispatch(catsLoading(store.getState()));
// console.log(store.getState().cats);
// {ids: ["a"], entities: {a: {id: "a", title: "Second"}}, loading: 'pending' }

// store.dispatch(
//   catsReceived([
//     { id: "b", title: "Book 3" },
//     { id: "c", title: "Book 2" },
//   ])
// );

// console.log(catsSelectors.selectIds(store.getState()));
// "a" был удален из-за вызова `setAll()`
// Поскольку книги сортируются по заголовкам, "Book 2" находится перед "Book 3"
// ["c", "b"]

// console.log(catsSelectors.selectAll(store.getState()));
// Все сущности в отсортированном порядке
// [{id: "c", title: "Book 2"}, {id: "b", title: "Book 3"}]
