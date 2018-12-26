import { actionTypes } from "../../actions";

interface IAuthStart {
    type: typeof actionTypes.AUTH_START,
    payload?: null;
}
interface IAuthSuccess {
    type: typeof actionTypes.AUTH_SUCCESS;
    payload: {
        authData: any;
    }
}
interface IAuthFail {
    type: typeof actionTypes.AUTH_FAIL;
    payload: {
        error: Error;
    }
}

export type AuthAction = IAuthStart | IAuthSuccess | IAuthFail