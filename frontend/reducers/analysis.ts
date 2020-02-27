// store/index.ts
import { Action } from "redux";

export const CLASSIFICATION_REQUEST = "CLASSIFICATION_REQUEST";
export const CLASSIFICATION_SUCCESS = "CLASSIFICATION_SUCCESS";
export const CLASSIFICATION_FAILURE = "CLASSIFICATION_FAILURE";
export const SIMILIAR_WORDS_REQUEST = "SIMILIAR_WORDS_REQUEST";
export const SIMILIAR_WORDS_SUCCESS = "SIMILIAR_WORDS_SUCCESS";
export const SIMILIAR_WORDS_FAILURE = "SIMILIAR_WORDS_FAILURE";
export const ANALOGY_WORDS_REQUEST = "ANALOGY_WORDS_REQUEST";
export const ANALOGY_WORDS_SUCCESS = "ANALOGY_WORDS_SUCCESS";
export const ANALOGY_WORDS_FAILURE = "ANALOGY_WORDS_FAILURE";
export const WORD_RELATION_REQUEST = "WORD_RELATION_REQUEST";
export const WORD_RELATION_SUCCESS = "WORD_RELATION_SUCCESS";
export const WORD_RELATION_FAILURE = "WORD_RELATION_FAILURE";

type AnalysisActionType =
  | typeof CLASSIFICATION_REQUEST
  | typeof CLASSIFICATION_SUCCESS
  | typeof CLASSIFICATION_FAILURE
  | typeof SIMILIAR_WORDS_REQUEST
  | typeof SIMILIAR_WORDS_SUCCESS
  | typeof SIMILIAR_WORDS_FAILURE
  | typeof ANALOGY_WORDS_REQUEST
  | typeof ANALOGY_WORDS_SUCCESS
  | typeof ANALOGY_WORDS_FAILURE
  | typeof WORD_RELATION_REQUEST
  | typeof WORD_RELATION_SUCCESS
  | typeof WORD_RELATION_FAILURE;

interface AnalysAction extends Action<AnalysisActionType> {
  data?: any;
  error?: string;
}

type item = (number | string)[];

interface SimilarResult {
  query: string[];
  result: item[] | null;
}

export type AnalysisState = {
  isClassfying: boolean;
  isClassfied: boolean;

  isSimilarWordFinding: boolean;
  isSimilarWordFinded: boolean;
  similarResult?: SimilarResult | null;

  wordRelationAnalysing: boolean;
  wordRelationAnalysed: boolean;
  relationResult?: any | null;
};

const initialState: AnalysisState = {
  isClassfying: false,
  isClassfied: false,

  isSimilarWordFinding: false,
  isSimilarWordFinded: false,
  similarResult: null,

  wordRelationAnalysing: false,
  wordRelationAnalysed: false,
  relationResult: null
};

const analysisReducer = (state = initialState, action: AnalysAction) => {
  switch (action.type) {
    case SIMILIAR_WORDS_REQUEST: {
      return {
        ...state,
        isSimilarWordFinding: true,
        isSimilarWordFinded: false
      };
    }
    case SIMILIAR_WORDS_SUCCESS: {
      return {
        ...state,
        isSimilarWordFinding: false,
        isSimilarWordFinded: true,
        similarResult: action.data
      };
    }
    case SIMILIAR_WORDS_FAILURE: {
      return {
        ...state,
        isSimilarWordFinding: false,
        isSimilarWordFinded: false
      };
    }

    case WORD_RELATION_REQUEST: {
      return {
        ...state,
        wordRelationAnalysing: true,
        wordRelationAnalysed: false
      };
    }
    case WORD_RELATION_SUCCESS: {
      return {
        ...state,
        wordRelationAnalysing: false,
        wordRelationAnalysed: true,
        relationResult: action.data
      };
    }
    case WORD_RELATION_FAILURE: {
      return {
        ...state,
        wordRelationAnalysing: false,
        wordRelationAnalysed: false
      };
    }
    default:
      return state;
  }
};

export default analysisReducer;
