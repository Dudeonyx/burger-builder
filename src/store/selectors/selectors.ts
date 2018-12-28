import { StoreState } from '../types';
import { createSelector } from 'reselect';
import { getTotalPrice } from '../../shared/getTotalPrice';
import { updatePurchasable } from '../../shared/updatePurchasable';
import { formatOrders } from '../reducers/ordersReducer/utilities';
import { generateErrorMessage } from '../../shared/generateErrorMessage';

export const selectIngredients = (state: StoreState) => state.ings.ingredients;
export const selectIngredientsError = (state: StoreState) => state.ings.error;
export const selectBurgerOrderSubmitting = (state: StoreState) =>
  state.cData.submitting;
export const selectBurgerOrderError = (state: StoreState) => state.cData.error;
export const selectOrders = (state: StoreState) => state.ords.orders;
export const selectOrdersError = (state: StoreState) => state.ords.error;
export const selectOrdersLoading = (state: StoreState) => state.ords.loading;
export const selectAuthIdToken = (state: StoreState) => state.auth.idToken;
export const selectAuthUserId = (state: StoreState) => state.auth.userId;
export const selectAuthError = (state: StoreState) => state.auth.error;
export const selectAuthAuthenticating = (state: StoreState) => {
  return state.auth.authenticating;
};

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
