import { combineReducers } from '@reduxjs/toolkit';

import { baseApi } from '../../api/questionsApi';
const rootReducers = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducers;