import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS
} from "../reducers/user";

function logInAPI(loginData: { username: string; password: string }) {
  return axios.post("/users/login", loginData, {
    withCredentials: true
  });
}

function* logIn(action: { type: string; data: any }) {
  try {
    yield delay(1000);
    const result = yield call(logInAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: LOG_IN_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE
    });
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

function logOutAPI() {
  return axios.post(
    "/users/logout",
    {},
    {
      withCredentials: true
    }
  );
}

function* logOut() {
  try {
    yield delay(1000);
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e
    });
  }
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function signUpAPI(signUpData: any) {
  // 서버에 요청을 보내는 부분
  return axios.post("/users/", signUpData);
}

function* signUp(action: any) {
  try {
    // yield call(signUpAPI);
    yield call(signUpAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: SIGN_UP_SUCCESS
    });
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)]);
}
