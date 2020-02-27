import { all, fork } from "redux-saga/effects";
import axios from "axios";
import analysis from "./analysis";
import user from "./user";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default function* rootSaga() {
  yield all([fork(user), fork(analysis)]);
}
