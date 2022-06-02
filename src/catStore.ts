import {
  createEntityAdapter,
  createSlice,
  configureStore,
  Store,
  EntityState,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ICat } from "./types";

async function myfetch2(options: any) {
  // let response = await fetch(url, options);
  // if (response.status === 200) {
  //   return await response.json();
  // } else {
  //   return response.status + ":" + response.statusText;
  // }
  // console.log("myfetch2 body", options);

  return new Promise((res, rej) => {
    setTimeout(() => {
      res("return from promise");
    }, 1000);
  });
}

export const fetchCats = createAsyncThunk(
  "cats/fetchCats",
  // myfetch2 // можно так

  async (params: any, thunkAPI) => {
    try {
      const response = await await fetch(params.url, params.options);
      if (response.status === 200) {
        return await response.json();
      } else {
        return response.status + ":" + response.statusText;
      }
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось загрузить");
    }
  }
);

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
  // Для отслеживания 'loading' или других ключей, их необходимо инициализировать: getInitialState({ loading: false })
  initialState: catsAdapter.getInitialState({
    loading: false,
  }),
  reducers: {
    catAdded: catsAdapter.addOne,

    catsLoading(state, action) {
      // if (state.loading === "idle") {
      state.loading = true;
      // }
    },

    // catsReceived(state, action) {
    //   if (state.loading === "pending") {
    //     catsAdapter.setAll(state, action.payload);
    //     state.loading = "idle";
    //   }
    // },
    catUpdated: catsAdapter.updateOne,
  },

  extraReducers: {
    [fetchCats.fulfilled.type]: (state, action) => {
      // : PayloadAction<string>
      // console.log("fetchCats.fulfilled.type: ", action.payload);

      // if (state.loading === "pending") {
      catsAdapter.setAll(state, action.payload);
      state.loading = false;
      // }
      // state.cats = action.payload;
    },
  },
});

// catsReceived,
export const { catAdded, catsLoading, catUpdated } = catsSlice.actions;

export const store = configureStore({
  reducer: {
    cats: catsSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const catsSelectors = catsAdapter.getSelectors(
  (state: RootState) => state.cats
);

// export type AppStore = ReturnType<typeof store>
// export type AppDispatch = AppStore['dispatch']

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
