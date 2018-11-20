import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import normalizeSearched from 'helpers/normalizeSearched';

import {
  API_KEY,
  BASE_URL,
  BASE_URL_VAT,
  FIND_CITY,
  GET_VATDETAILS,
} from './constants';

import {
  startFetching,
  stopFetching,
  receiveError,
  receiveSearched,
  receiveVatDetails,
} from './actions';

export function* fetchSearched(action) {
  try {
    yield put(startFetching());
    const cities = yield call(
      axios.get,
      `${BASE_URL}/find?APPID=${API_KEY}&units=metric&cnt=3&q=${
        action.query
      }`,
    );
    yield put(stopFetching());
    yield put(receiveSearched(normalizeSearched(cities.data.list)));
  } catch (error) {
    yield put(stopFetching());
    yield put(receiveError(error));
  }
}

export function* fetchVatDetails(action) {
  try {
    yield put(startFetching());
    const vatDetails = yield call(
      axios.get,
      `${BASE_URL_VAT}/numbers?vatNumber=${action.fieldName}`,
    );
    console.log('hello world!', vatDetails);
    yield put(stopFetching());
    yield put(
      receiveVatDetails({
        vatData: vatDetails.data,
      }),
    );
  } catch (error) {
    yield put(stopFetching());
    yield put(receiveError(error));
  }
}

export default function* watcher() {
  yield [
    takeLatest(FIND_CITY, fetchSearched),
    takeLatest(GET_VATDETAILS, fetchVatDetails),
  ];
}
