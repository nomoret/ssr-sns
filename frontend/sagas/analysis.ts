import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import axios from "axios";
import {
  SIMILIAR_WORDS_REQUEST,
  SIMILIAR_WORDS_SUCCESS,
  SIMILIAR_WORDS_FAILURE,
  WORD_RELATION_REQUEST,
  WORD_RELATION_SUCCESS,
  WORD_RELATION_FAILURE,
  ANALOGY_WORDS_REQUEST,
  ANALOGY_WORDS_SUCCESS,
  ANALOGY_WORDS_FAILURE
} from "../reducers/analysis";

function similarWordsAPI({ query, k }: { query: string; k: string }) {
  return axios.get(`analysis/fasttext/simliarity?query=${query}&k=${k}`, {
    withCredentials: true
  });
}

function* similarWords(action: { type: string; data: any }) {
  try {
    yield delay(2000);
    const result = yield call(similarWordsAPI, action.data);
    yield put({
      type: SIMILIAR_WORDS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SIMILIAR_WORDS_FAILURE
    });
  }
}

function* watchSimilarWords() {
  yield takeEvery(SIMILIAR_WORDS_REQUEST, similarWords);
}

function analogyWordsAPI({ wordA = "", wordB = "", wordC = "", k = 10 }) {
  return axios.get(
    `analysis/fasttext/analogies?wordA=${wordA}&wordB=${wordB}&wordC=${wordC}&k=${k}`,
    {
      withCredentials: true
    }
  );
}

function* analogyWords(action: { type: string; data: any }) {
  try {
    const result = yield call(analogyWordsAPI, action.data);
    yield put({
      type: ANALOGY_WORDS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ANALOGY_WORDS_FAILURE
    });
  }
}

function* watchAnalogyWords() {
  yield takeEvery(ANALOGY_WORDS_REQUEST, analogyWords);
}

function wordRelationAPI(data: any) {
  return axios.post(
    `analysis/fasttext/visualize`,
    {
      data
    },
    {
      withCredentials: true
    }
  );
}

function* wordRelation(action: { type: string; data: any }) {
  try {
    yield delay(2000);
    const result = yield call(wordRelationAPI, action.data);
    yield put({
      type: WORD_RELATION_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: WORD_RELATION_FAILURE
    });
  }
}

function* watchWordRelation() {
  yield takeEvery(WORD_RELATION_REQUEST, wordRelation);
}

export default function* userSaga() {
  yield all([
    fork(watchSimilarWords),
    fork(watchAnalogyWords),
    fork(watchWordRelation)
  ]);
}
