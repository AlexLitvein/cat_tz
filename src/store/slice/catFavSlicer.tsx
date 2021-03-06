import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ICat2 } from '../../models/types'; //  ICat2,
import { catsAPI } from '../../services/CatsService';
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
  sortComparer: (a: ICat2, b: ICat2) => (a.id < b.id ? -1 : 1),
});

const catsFavAdapter = createEntityAdapter({
  sortComparer: (a: ICat2, b: ICat2) => (a.id < b.id ? -1 : 1),
});

export const catsFavSlice = createSlice({
  name: 'catsFav',
  // По умолчанию `createEntityAdapter()` возвращает `{ ids: [], entities: {} }`
  // Для отслеживания 'loading' или других ключей, их необходимо инициализировать: getInitialState({ loading: false })
  initialState: catsFavAdapter.getInitialState({}),
  reducers: {
    catAdd: catsFavAdapter.addOne,

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
    // catUpdated: catsFavAdapter.updateOne,
  },
});

export const fetchCats = createAsyncThunk('cats/fetchCats', async (params: any) => {
  // , thunkAPI
  // const response = await userAPI.fetchById(userId);
  // const { data: catsFetched = [], error, isLoading, isFetching } = catsAPI.useFetchCatsQuery({ limit, page });
  const response = await catsAPI.useFetchCatsQuery({ limit: params.limit, page: params.page });
  return response.data;
});

export const catsSlice = createSlice({
  name: 'cats',
  // По умолчанию `createEntityAdapter()` возвращает `{ ids: [], entities: {} }`
  // Для отслеживания 'loading' или других ключей, их необходимо инициализировать: getInitialState({ loading: false })
  initialState: catsAdapter.getInitialState({
    isLoading: false, // ????
    error: '', // ????
    currPage: 1, // ????
  }),
  reducers: {
    catAddMany: catsAdapter.addMany,
    catAdd: catsAdapter.addOne,
    // setCurrPage(state, action) {
    //   state.currPage = action.payload;
    // },
    catUpdate: catsFavAdapter.updateOne,
    catRemoveOne: catsFavAdapter.removeOne,
  },
  // extraReducers: {
  //   [fetchCats.fulfilled.type]: (state, action) => {
  //     // : PayloadAction<string>
  //     // console.log("fetchCats.fulfilled.type: ", action.payload);

  //     // if (state.loading === "pending") {
  //     catsAdapter.addMany(state, action.payload);
  //     // catsAdapter.setAll(state, action.payload);
  //     state.isLoading = false;
  //     // }
  //     // state.cats = action.payload;
  //   },
  //   [fetchCats.pending.type]: (state) => {
  //     state.isLoading = true;
  //   },
  //   // [fetchCats.rejected.type]: (state, action: PayloadAction<string>) => {
  //   //   state.isLoading = false;
  //   //   state.error = action.payload;
  //   // },
  // },
});

// catsReceived,catsLoading,

export const { catAdd: catFavAdd, catRemoveOne: catFavRemoveOne } = catsFavSlice.actions;
export const { catAddMany, catUpdate, catRemoveOne, catAdd } = catsSlice.actions;
export const catsFavSelectors = catsFavAdapter.getSelectors((state: RootState) => state.catsFav);
export const catsSelectors = catsAdapter.getSelectors((state: RootState) => state.cats);
