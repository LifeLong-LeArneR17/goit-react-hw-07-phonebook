import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./reducer";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
const contactsReducerConfig = {
    key: 'user',
    storage,
    whitelist: ['contacts']
  };
export const store = configureStore({
    reducer: {
        contactsData: persistReducer(contactsReducerConfig, contactsReducer),
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor = persistStore(store);