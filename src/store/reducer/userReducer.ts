import { User, UserAction, UserState } from "../../types/user";

const initialState:UserState = {
    data: {} as User,
    loading: false,
    error: ''
}


const userReducer = (state:UserState= initialState, action:UserAction) => {
  
      return state;
  
}

export default userReducer;