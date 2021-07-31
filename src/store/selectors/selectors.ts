import { getTotalPrice } from "../../shared/getTotalPrice";
import { updatePurchasable } from "../../shared/updatePurchasable";
import { formatOrders } from "../reducers/ordersReducer/utilities";
import { generateErrorMessage } from "../../shared/generateErrorMessage";
import { authSelectors } from "../reducers/authReducer";
import { cDataSelectors } from "../reducers/contactDataReducer";
import { ingredientSelectors } from "../reducers/ingredientReducer";
import { ordersSelectors } from "../reducers/ordersReducer";
import { createSelector } from "@redux-ts-starter-kit/slice";

export const { ingredients: selectIngredients, error: selectIngredientsError } =
  ingredientSelectors;

export const {
  submitting: selectBurgerOrderSubmitting,
  error: selectBurgerOrderError,
} = cDataSelectors;

export const {
  orders: selectOrders,
  loading: selectOrdersLoading,
  error: selectOrdersError,
} = ordersSelectors;

export const {
  idToken: selectAuthIdToken,
  error: selectAuthError,
  userId: selectAuthUserId,
  authenticating: selectAuthAuthenticating,
  authRedirectUrl: selectAuthRedirectUrl,
} = authSelectors;

export const getTotalPriceFromStore = createSelector(
  selectIngredients,
  (ingredients) => {
    return getTotalPrice(ingredients);
  }
);
export const getPurchaseableFromStore = createSelector(
  selectIngredients,
  (ingredients) => updatePurchasable(ingredients)
);

export const getFormattedOrders = createSelector(selectOrders, (orders) =>
  formatOrders(orders)
);
export const getOrdersErrorMessage = createSelector(
  selectOrdersError,
  (error) => generateErrorMessage(error)
);

export const getAuthenticated = createSelector(
  selectAuthIdToken,
  (token) => !!token
);

export const getAuthErrorMessage = createSelector(selectAuthError, (error) =>
  generateErrorMessage(error)
);
