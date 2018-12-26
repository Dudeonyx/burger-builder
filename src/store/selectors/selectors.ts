import { IstoreState } from '../types';
import { createSelector } from 'reselect';
import { getTotalPrice } from '../../shared/getTotalPrice';
import { updatePurchasable } from '../../shared/updatePurchasable';

export const selectIngredients = (state: IstoreState) => state.ings.ingredients;
export const selectIngredientsError = (state: IstoreState) => state.ings.error;
export const selectSubmitting = (state: IstoreState) => state.cData.submitting;

export const selectOrders = (state: IstoreState) => state.ords.orders;
export const selectPresubmitOrder = (state: IstoreState) =>
  state.cData.presubmitOrder;
export const selectformattedOrders = (state: IstoreState) => {
  return state.ords.formattedOrders;
};
export const selectOrdersLoading = (state: IstoreState) => state.ords.loading;

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

export const getIngredientState = createSelector(
  selectIngredients,
  getTotalPriceFromStore,
  selectIngredientsError,
  getPurchaseableFromStore,
  (ingredients, totalPrice, error, purchaseable) => {
    return {
      ingredients,
      totalPrice,
      error,
      purchaseable,
    };
  },
);
