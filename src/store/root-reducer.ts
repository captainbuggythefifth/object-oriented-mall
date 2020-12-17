import { combineReducers } from '@reduxjs/toolkit';
import complexReducer from 'store/complex/complex';

const rootReducer = combineReducers({
  complex: complexReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer