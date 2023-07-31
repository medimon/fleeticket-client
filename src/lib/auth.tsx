import storage from "../utils/storage";
import { configureAuth } from "react-query-auth";

import {
  loginWithEmailAndPassword,
  UserResponse,
  LoginCredentialsDTO,
  AuthUser,
} from "../features/auth";
import { logout } from "../features/auth/api/logout";
import { Spinner } from "../components/Elements/Spinner";

async function handleUserResponse(data: UserResponse) {
  storage.setUser(JSON.stringify(data));
  return data;
}

async function loadUser() {
  if (storage.getUser()) {
    const data = JSON.parse(storage.getUser());
    return data;
  }
  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  await logout();
  storage.clearUser();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  userFn: loadUser,
  loginFn,
  registerFn: loginFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner size="xl" />
        <div>loading...</div>
      </div>
    );
  },
};

export const { useUser, useLogin, useRegister, AuthLoader, useLogout } =
  configureAuth<
    AuthUser | null,
    unknown,
    LoginCredentialsDTO,
    LoginCredentialsDTO
  >(authConfig);
