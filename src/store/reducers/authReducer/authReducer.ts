import { AuthReducerState } from "./types";
import { CasesBuilder, createSlice } from "@redux-ts-starter-kit/slice";

const initialState: AuthReducerState = {
  authenticating: false,
  error: null,
  idToken: null,
  userId: null,
  displayName: null,
  authRedirectUrl: "/",
};
interface AuthActions {
  authStart: undefined;
  authSuccess: { localId: string; idToken: string };
  authFail: Error;
  authLogout: undefined;
  setAuthRedirectUrl: string;
}
const authSlice = createSlice<
  "auth",
  CasesBuilder<AuthReducerState, AuthActions>,
  AuthReducerState
>({
  name: "auth",
  cases: {
    authStart: (state) => {
      state.authenticating = true;
      state.error = null;
    },
    authSuccess: (state, payload) => {
      state.authenticating = false;
      state.error = null;
      state.userId = payload.localId;
      state.idToken = payload.idToken;
    },
    authFail: (state, payload) => {
      state.authenticating = false;
      state.error = payload;
    },
    authLogout: (state) => {
      state.idToken = null;
      state.userId = null;
      state.displayName = null;
    },
    setAuthRedirectUrl: (state, payload) => {
      state.authRedirectUrl = payload;
    },
  },
  initialState,
});

export const {
  reducer: authReducer,
  actions: authActions,
  selectors: authSelectors,
} = authSlice;
