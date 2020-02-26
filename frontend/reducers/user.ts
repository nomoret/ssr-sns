// store/index.ts
import { Action } from "redux";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST" as const;
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

type UserActionType =
  | typeof SIGN_UP_REQUEST
  | typeof SIGN_UP_SUCCESS
  | typeof SIGN_UP_FAILURE
  | typeof LOG_IN_REQUEST
  | typeof LOG_IN_SUCCESS
  | typeof LOG_IN_FAILURE
  | typeof LOAD_USER_REQUEST
  | typeof LOAD_USER_SUCCESS
  | typeof LOAD_USER_FAILURE
  | typeof LOG_OUT_REQUEST
  | typeof LOG_OUT_SUCCESS
  | typeof LOG_OUT_FAILURE;

interface UserAction extends Action<UserActionType> {
  data?: any;
  error?: string;
}

export type UserState = {
  isLoggedOut: boolean;
  isLoggingOut: boolean;
  isLoggingIn: boolean;
  logInErrorReason: string;
  isSignedUp: boolean;
  isSigningUp: boolean;
  signUpErrorReason: string;
  me: any;
};

const initialState: UserState = {
  isLoggedOut: false, // 로그아웃 성공
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: "", // 로그인 실패 사유
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: "", // 회원가입 실패 사유
  me: null
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
        logInErrorReason: ""
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        me: action.data,
        isLoading: false
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
        logInErrorReason: action.error,
        me: null
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggedOut: false,
        isLoggingOut: true
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        isLoggedOut: true,
        isLoggingOut: false,
        me: null
      };
    }
    default:
      return state;
  }
};

export default userReducer;
