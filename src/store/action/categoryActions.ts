import {
  CategoryDispatch,
  CategoryForm,
  CategoryType,
} from "../../types/category";
import api from "../../utils/api";

export const getCategories = () => async (dispatch: CategoryDispatch) => {
  dispatch({ type: "GET_CATEGORIES_START" });
  try {
    const response = await api().get<CategoryType[]>("/categories");
    dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: response.data });
  } catch (error: any) {
    dispatch({
      type: "GET_CATEGORIES_ERROR",
      payload: error.response.data.errorMessage,
    });
  }
};

export const addCategory =
  (form: CategoryForm) => async (dispatch: CategoryDispatch) => {
    dispatch({ type: "ADD_CATEGORY_START" });
    try {
      const response = await api().post<CategoryType>(
        "/categories",
        form as any
      );
      dispatch({ type: "ADD_CATEGORY_SUCCESS", payload: response.data });
    } catch (error: any) {
      dispatch({
        type: "ADD_CATEGORY_ERROR",
        payload: error.response.data.errorMessage,
      });
    }
  };

export const updateCategory =
  // Partial is used to allow the user to update only the fields they want to

    (form: Partial<CategoryForm>, categoryId: number) =>
    async (dispatch: CategoryDispatch) => {
      dispatch({ type: "UPDATE_CATEGORY_START" });
      try {
        const response = await api().put<CategoryType>(
          `/categories/${categoryId}`,
          form as any
        );
        dispatch({ type: "UPDATE_CATEGORY_SUCCESS", payload: response.data });
      } catch (error: any) {
        dispatch({
          type: "UPDATE_CATEGORY_ERROR",
          payload: error.response.data.errorMessage,
        });
      }
    };

export const deleteCategory =
  (id: number) => async (dispatch: CategoryDispatch) => {
    dispatch({ type: "DELETE_CATEGORY_START" });
    try {
      await api().delete(`/categories/${id}`);
      dispatch({ type: "DELETE_CATEGORY_SUCCESS", payload: id });
    } catch (error: any) {
      dispatch({
        type: "DELETE_CATEGORY_ERROR",
        payload: "opps an error ",
      });
    }
  };
