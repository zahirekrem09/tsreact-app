import { combineReducers } from "redux";
import { UserState } from "../types/user";
import userReducer from "./reducer/userReducer";

interface AppState {user:UserState, categories:any,records:any}

const rootReducer = combineReducers<AppState>({
    user:userReducer,
    categories:()=>{},
    records:()=>{}
});

export default rootReducer;