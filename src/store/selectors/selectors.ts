import { createSelector } from 'reselect';
import { getTotalPrice } from '../../shared/getTotalPrice';
import { updatePurchasable } from '../../shared/updatePurchasable';
import { formatOrders } from '../reducers/ordersReducer/utilities';
import { generateErrorMessage } from '../../shared/generateErrorMessage';
import { IStore } from '../store';

export const selectIngredients = (state: IStore) => state.ings.ingredients;
export const selectIngredientsError = (state: IStore) => state.ings.error;
export const selectBurgerOrderSubmitting = (state: IStore) =>
  state.cData.submitting;
export const selectBurgerOrderError = (state: IStore) => state.cData.error;
export const selectOrders = (state: IStore) => state.ords.orders;
export const selectOrdersError = (state: IStore) => state.ords.error;
export const selectOrdersLoading = (state: IStore) => state.ords.loading;
export const selectAuthIdToken = (state: IStore) => state.auth.idToken;
export const selectAuthUserId = (state: IStore) => state.auth.userId;
export const selectAuthError = (state: IStore) => state.auth.error;
export const selectAuthAuthenticating = (state: IStore) => {
  return state.auth.authenticating;
};
export const selectAuthRedirectUrl = (state: IStore) =>
  state.auth.authRedirectUrl;

export const getTotalPriceFromStore = createSelector(
  selectIngredients,
  ingredients => {
    return getTotalPrice(ingredients);
  },
);
export const getPurchaseableFromStore = createSelector(
  selectIngredients,
  ingredients => updatePurchasable(ingredients),
);

export const getFormattedOrders = createSelector(
  selectOrders,
  orders => formatOrders(orders),
);
export const getOrdersErrorMessage = createSelector(
  selectOrdersError,
  error => generateErrorMessage(error),
);

export const getAuthenticated = createSelector(
  selectAuthIdToken,
  token => !!token,
);

export const getAuthErrorMessage = createSelector(
  selectAuthError,
  error => generateErrorMessage(error),
);
