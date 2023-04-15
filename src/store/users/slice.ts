import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserIdType, UserWithId } from "../../models/user";
import { INITIAL_STATE } from "./initialState";

const initialState: UserWithId[] = (() => {
  const persitedState = localStorage.getItem("users");
  return persitedState ? JSON.parse(persitedState).users : INITIAL_STATE;
})();

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID();
      return [...state, { id: id, ...action.payload }];
    },
    deleteUserById: (state, action: PayloadAction<UserIdType>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const existsUser = state.some((user) => user.id === action.payload.id);
      if (!existsUser) {
        return [...state, action.payload];
      }
    },
  },
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
