import { publicRequest } from "../requestMethod";
import { loginStarted, loginSuccess, loginFailure, logOut } from "./userSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStarted());

  try {
    const res = await publicRequest.post("/auth/login", user);

    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const logout = (dispatch) => {
  dispatch(logOut());
};
