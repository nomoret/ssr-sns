import { combineReducers } from "redux";
import userReducer from "./user";
import analysisReducer from "./analysis";

const rootReducer = combineReducers({
  analysis: analysisReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
