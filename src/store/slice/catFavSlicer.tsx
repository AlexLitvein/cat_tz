import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ICat } from '../../models/types';
import { RootState } from '../catsStore';

/* createEntityAdapter() 
предоставляет стандартизированный способ хранения данных путем преобразования коллекции в форму { ids: [], entities: {} }. 
Кроме предопределения формы состояния, эта функция генерирует набор редукторов и селекторов, которые знают, как работать с такими данными.
По умолчанию createEntityAdapter() предполагает, что данные имеют уникальные идентификаторы в поле entity.id.
Если данные хранят идентификаторы в другом поле, можно передать аргумент selectId, возвращающий соответствующее поле.
Поскольку мы не указываем `selectId`, уникальным полем будет считаться `entity.id`

Основное содержимое адаптера сущности
- это набор редукторов для добавления, обновления и удаления экземпляров из объекта состояния:
addOne - принимает единичную сущность и добавляет ее
addMany - принимает массив сущностей или объект определенной формы и добавляет их
setAll - принимает массив сущностей или объект определенной формы и заменяет контент существующих сущностей значениями из массива
setMany - принимает массив сущностей или объект в форме Record<EntityId, T> и добавляет или заменяет их.
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

const catsFavAdapter = createEntityAdapter({
  // Сортируем массив с идентификаторами по заголовкам книг
  // Указывая тип параметров, ts опредедяет тип сущности в стате
  // sortComparer: (a: ICat, b: ICat) => a.id.localeCompare(b.id), // !!! последующее изменение ф-ии сравнения не применяется
  sortComparer: (a: ICat, b: ICat) => (a.id < b.id ? -1 : 1),
});

export const catsFavSlice = createSlice({
  name: 'catsFav',
  // По умолчанию `createEntityAdapter()` возвращает `{ ids: [], entities: {} }`
  // Для отслеживания 'loading' или других ключей, их необходимо инициализировать: getInitialState({ loading: false })
  initialState: catsFavAdapter.getInitialState({
    isLoading: false,
    error: '',
  }),
  reducers: {
    catAdded: catsFavAdapter.addOne,

    catRemoveOne: catsFavAdapter.removeOne,

    // catsLoading(state, action) {
    //   // if (state.loading === "idle") {
    //   state.isLoading = true;
    //   // }
    // },

    // catsReceived(state, action) {
    //   if (state.loading === "pending") {
    //     catsAdapter.setAll(state, action.payload);
    //     state.loading = "idle";
    //   }
    // },
    catUpdated: catsFavAdapter.updateOne,
  },

  // extraReducers: {
  //   [fetchCats.fulfilled.type]: (state, action) => {
  //     // : PayloadAction<string>
  //     // console.log("fetchCats.fulfilled.type: ", action.payload);

  //     // if (state.loading === "pending") {
  //     catsAdapter.setAll(state, action.payload);
  //     state.isLoading = false;
  //     // }
  //     // state.cats = action.payload;
  //   },
  //   [fetchCats.pending.type]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [fetchCats.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  // },
});

export const catsSlice = createSlice({
  name: 'cats',
  // По умолчанию `createEntityAdapter()` возвращает `{ ids: [], entities: {} }`
  // Для отслеживания 'loading' или других ключей, их необходимо инициализировать: getInitialState({ loading: false })
  initialState: catsAdapter.getInitialState({
    currPage: 1,
  }),
  reducers: {
    catAddMany: catsAdapter.addMany,
    setCurrPage(state, action) {
      state.currPage = action.payload;
    },
    // catUpdated: catsFavAdapter.updateOne,
  },
});

// catsReceived,catsLoading,

export const { catAdded, catUpdated, catRemoveOne } = catsFavSlice.actions;
export const { catAddMany, setCurrPage } = catsSlice.actions;
export const catsFavSelectors = catsFavAdapter.getSelectors(
  // (state: RootState) => state.cats
  (state: RootState) => state.catsFav
);
export const catsSelectors = catsAdapter.getSelectors(
  // (state: RootState) => state.cats
  (state: RootState) => state.cats
);
