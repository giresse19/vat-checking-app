/*
 *
 * MainPage actions
 *
 */

import {
  START_FETCHING,
  STOP_FETCHING,
  FIND_CITY,
  FIND_VATNUMBER,
  GET_VATDETAILS,
  RECEIVE_ERROR,
  RECEIVE_SEARCHED,
  RECEIVE_VATDETAILS,
  UPDATE_FIELD,
  UPDATE_TIMER,
  UPDATE_CITY_ID,
} from './constants';

export function startFetching() {
  return {
    type: START_FETCHING,
  };
}

export function stopFetching() {
  return {
    type: STOP_FETCHING,
  };
}

export function findCity(query) {
  return {
    type: FIND_CITY,
    query,
  };
}

export function findVatNumber(Name) {
  return {
    type: FIND_VATNUMBER,
    Name,
  };
}

export function getVatDetails(fieldName) {
  return {
    type: GET_VATDETAILS,
    fieldName,
  };
}

export function receiveError(error) {
  return {
    type: RECEIVE_ERROR,
    error,
  };
}

export function receiveSearched(cities) {
  return {
    type: RECEIVE_SEARCHED,
    cities,
  };
}

export function receiveVatDetails(vatDetails) {
  return {
    type: RECEIVE_VATDETAILS,
    vatDetails,
  };
}

export function updateField(fieldName, query) {
  return {
    type: UPDATE_FIELD,
    fieldName,
    query,
  };
}

export function updateTimer(timer) {
  return {
    type: UPDATE_TIMER,
    timer,
  };
}

export function updateCityId(id) {
  return {
    type: UPDATE_CITY_ID,
    id,
  };
}
