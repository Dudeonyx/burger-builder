import { IstoreState } from '../types';
import { createSelector } from 'reselect';
import { getTotalPrice } from '../../shared/getTotalPrice';

export const ingredientsSelector = (state: IstoreState) => {
  return state.ings.ingredients;
};
export const ingredientsErrorSelector = (state: IstoreState) => {
  return state.ings.error;
};
export const customerSelector = (state: IstoreState) => {
  return state.cData.customer;
};
export const submittingSelector = (state: IstoreState) => {
  return state.cData.submitting;
};

export const getTotalPriceFromStore = createSelector(
  ingredientsSelector,
  ingredients => {
    return getTotalPrice(ingredients);
  },
);
export const getCustomerFromState = createSelector(
  customerSelector,
  customer => customer,
);
export const getSubmitOrderState = createSelector(
  customerSelector,
  ingredientsSelector,
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
  customerSelector,
  submittingSelector,
  (customer, submitting) => {
    return {
      customer,
      submitting,
    };
  },
);
export const getIngredientState = createSelector(
  ingredientsSelector,
  getTotalPriceFromStore,
  ingredientsErrorSelector,
  (ingredients, totalPrice, error) => {
    return {
      ingredients,
      totalPrice,
      error,
    };
  },
);
