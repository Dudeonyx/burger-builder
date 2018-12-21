import { IcontactDataReducerActionTypes, IingActionTypes } from './types';
export const contactDataReducerActionTypes: IcontactDataReducerActionTypes = {
  UPDATE_CONTACT_FORM: 'UPDATE_CONTACT_FORM',
  RESET_CONTACT_FORM: 'RESET_CONTACT_FORM',
  ORDER_SUCCESSFUL: 'ORDER_SUCCESSFUL',
  ORDER_FAILED: 'ORDER_FAILED',
};

export const ingredientActionTypes = Object.freeze<IingActionTypes>({
  INCREASE_INGREDIENT: 'INCREASE_INGREDIENT',
  DECREASE_INGREDIENT: 'DECREASE_INGREDIENT',
  SET_INGREDIENTS: 'SET_INGREDIENTS',
  SET_ERROR: 'SET_ERROR',
});
