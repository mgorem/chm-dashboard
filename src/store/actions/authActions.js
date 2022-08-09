import { authService } from "../../services/auth/AuthService";
import { formateError } from "../../utils";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";
export const LOADING_ON = "LOADING_ON";
export const LOADING_OFF = "LOADING_OFF";

export const signUpAction =
  (email, password, returnSecureToken = false, navigate) =>
  (dispatch) => {
    dispatch(setLoadingOn());

    authService
      .signup({ email, password, returnSecureToken })
      .then((response) => {
        dispatch(setLoadingOff());
        dispatch(confirmedSignupAction(response));
        navigate("/sign-in");
      })
      .catch((error) => {
        const errorMessage = formateError(error.response.data);
        dispatch(failedSignupAction(errorMessage));
        dispatch(setLoadingOff());
      });
  };

export const signInAction =
  (email, password, returnSecureToken = true, navigate) =>
  (dispatch) => {
    dispatch(setLoadingOn());

    authService
      .login({ email, password, returnSecureToken })
      .then((response) => {
        const { idToken, refreshToken, expiresIn, localId } = response.data;
        authService.saveTokensInSessionStorage({
          idToken,
          refreshToken,
          expiresIn,
          localId,
        });
        dispatch(setLoadingOff());
        dispatch(loginConfirmedAction(response.data));
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = formateError(error.response.data);
        dispatch(loginFailedAction(errorMessage));
        dispatch(setLoadingOff());
      });
  };

export function setLoadingOn() {
  return {
    type: LOADING_ON,
  };
}

export function setLoadingOff() {
  return {
    type: LOADING_OFF,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function failedSignupAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}
