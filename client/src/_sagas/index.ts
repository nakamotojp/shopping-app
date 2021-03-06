import { all, call } from "redux-saga/effects";
import user from "./user";
import post from "./post";
import Axios from "axios";
import { backUrl } from "../config/config";

Axios.defaults.baseURL = `${backUrl}/api`;

export default function* rootSaga(): Generator {
  yield all([call(user), call(post)]);
}
