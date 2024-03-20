// store.ts
// src/store.ts

import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import aiReducer from './reducers/aiReducer';

const rootReducer = combineReducers({
    ai: aiReducer,
    // Add other reducers here if any
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState here

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
