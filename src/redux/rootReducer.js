import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import auth from './Auth/reducers'

export const rootReducer = combineReducers({
  auth: auth,
 
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
