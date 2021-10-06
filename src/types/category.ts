import { ThunkDispatch } from "redux-thunk";

export interface CategoryState {
  data: CategoryType[];
  loading: boolean;
  error: string;
}

export interface CategoryType {
  id: number;
  name: string;
  type: "income" | "expense";
  color: string;
}

export interface CategoryForm {
  name: string;
  type: "income" | "expense";
  color?: string;
}

interface GET_CATEGORIES_START {
  type: "GET_CATEGORIES_START";
}

interface GET_CATEGORIES_SUCCESS {
  type: "GET_CATEGORIES_SUCCESS";
  payload: CategoryType[];
}
interface GET_CATEGORIES_ERROR {
  type: "GET_CATEGORIES_ERROR";
  payload: string;
}
interface ADD_CATEGORY_START {
  type: "ADD_CATEGORY_START";
}

interface ADD_CATEGORY_SUCCESS {
  type: "ADD_CATEGORY_SUCCESS";
  payload: CategoryType;
}
interface ADD_CATEGORY_ERROR {
  type: "ADD_CATEGORY_ERROR";
  payload: string;
}
interface UPDATE_CATEGORY_START {
  type: "UPDATE_CATEGORY_START";
}

interface UPDATE_CATEGORY_SUCCESS {
  type: "UPDATE_CATEGORY_SUCCESS";
  payload: CategoryType;
}
interface UPDATE_CATEGORY_ERROR {
  type: "UPDATE_CATEGORY_ERROR";
  payload: string;
}

interface DELETE_CATEGORY_START {
  type: "DELETE_CATEGORY_START";
}

interface DELETE_CATEGORY_SUCCESS {
  type: "DELETE_CATEGORY_SUCCESS";
  payload: number;
}

interface DELETE_CATEGORY_ERROR {
  type: "DELETE_CATEGORY_ERROR";
}

export type CategoryAction =
  | GET_CATEGORIES_START
  | GET_CATEGORIES_SUCCESS
  | GET_CATEGORIES_ERROR
  | ADD_CATEGORY_START
  | ADD_CATEGORY_SUCCESS
  | ADD_CATEGORY_ERROR
  | UPDATE_CATEGORY_START
  | UPDATE_CATEGORY_SUCCESS
  | UPDATE_CATEGORY_ERROR
  | DELETE_CATEGORY_START
  | DELETE_CATEGORY_SUCCESS
  | DELETE_CATEGORY_ERROR;
export type CategoryDispatch = ThunkDispatch<
  CategoryState,
  void,
  CategoryAction
>;
