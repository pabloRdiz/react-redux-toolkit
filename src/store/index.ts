import { type Middleware, configureStore } from "@reduxjs/toolkit";
import usersReducer, { rollbackUser } from "./users/slice";
import { toast } from "sonner";

const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    next(action);
    localStorage.setItem("users", JSON.stringify(store.getState()));
  };

const syncWithDatabaseMiddleware: Middleware =
  (store) => (next) => (action) => {
    const { type, payload } = action;
    const prevState = store.getState();

    next(action);

    if (type === "users/deleteUserById") {
      const userIdToRemove = payload;
      const userToRemove = prevState.users.find(
        (user) => user.id === userIdToRemove,
      );

      fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            toast.success("Usuario borrado correctamente");
          }
          throw new Error();
        })
        .catch((error) => {
          if (userToRemove) {
            store.dispatch(rollbackUser(userToRemove));
          }
          toast.error(`no se pudo borrar el usuario ${userIdToRemove}`);
        });
    }
    if (type === "users/addNewUser") {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
      })
        .then((response) => {
          if (response.ok) {
            toast.success("Usuario creado");
          }
        })
        .catch((error) => {
          toast.error("no se pudo crear el usuario");
          console.error(error);
        });
    }
  };

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
2;
