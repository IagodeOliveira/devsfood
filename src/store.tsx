import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['cart', 'user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store as any);

export { store, persistor };
