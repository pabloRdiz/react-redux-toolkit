import { useAppDispatch } from "./store";
import { deleteUserById, addNewUser } from "../store/users/slice";
import { User, UserIdType } from "../models/user";

const useUserActions = () => {
  const dispatch = useAppDispatch();

  const removeUser = (id: UserIdType) => {
    dispatch(deleteUserById(id));
  };

  const addUser = (user: User) => {
    dispatch(addNewUser(user));
  };

  return { addUser, removeUser };
};

export default useUserActions;
