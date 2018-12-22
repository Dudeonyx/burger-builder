import { IstoreState } from '../types';
import { createSelector } from 'reselect';
import { getTotalPrice } from '../../shared/getTotalPrice';
import { updatePurchasable } from '../../shared/updatePurchasable';

export const selectIngredients = (state: IstoreState) => {
  return state.ings.ingredients;
};
export const selectIngredientsError = (state: IstoreState) => {
  return state.ings.error;
};
export const selectCustomer = (state: IstoreState) => {
  return state.cData.customer;
};
export const selectSubmitting = (state: IstoreState) => {
  return state.cData.submitting;
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
export const getCustomerFromState = createSelector(
  selectCustomer,
  customer => customer,
);
export const getSubmitOrderState = createSelector(
  selectCustomer,
  selectIngredients,
  getTotalPriceFromStore,
  (customer, ingredients, totalPrice) => {
    return {
      customer,
      ingredients,
      totalPrice,
    };
  },
);
export const getContactDataState = createSelector(
  selectCustomer,
  selectSubmitting,
  (customer, submitting) => {
    return {
      customer,
      submitting,
    };
  },
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
