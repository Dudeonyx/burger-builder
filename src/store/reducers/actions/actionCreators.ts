import { Dispatch } from 'redux';
import { ChangeEvent } from 'react';

import { IingredientsKeys, Iingredients } from '../../../types/ingredients';
import { IingredientReducerAction } from '../ingredientReducer/types';
import { contactDataReducerActionTypes, ingredientActionTypes } from './index';
import axios from '../../../axios-orders';

export const ingredientIncreaseHandler = (igkey: IingredientsKeys) => {
  return {
    type: ingredientActionTypes.INCREASE_INGREDIENT,
    payload: { igkey },
  };
};
export const ingredientDecreaseHandler = (igkey: IingredientsKeys) => {
  return {
    type: ingredientActionTypes.DECREASE_INGREDIENT,
    payload: { igkey },
  };
};
export const ingredientSetHandler = (ingredients: Iingredients | null) => {
  return {
    type: ingredientActionTypes.SET_INGREDIENTS,
    payload: { ingredients },
  };
};
export const ingredientErrorHandler = (error: boolean) => {
  return {
    type: ingredientActionTypes.SET_ERROR,
    payload: { error },
  };
};

export const fetchIngredientsHandler = () => {
  return async (dispatch: Dispatch<IingredientReducerAction>) => {
    // this.setState({ error: null });
    dispatch(ingredientErrorHandler(false));
    try {
      const response = await axios.get<Iingredients>('/ingredients.json');
      const { data: newIngredients } = response;
      dispatch(ingredientSetHandler(newIngredients));
    } catch (error) {
      dispatch(ingredientErrorHandler(true));
    }
  };
};

export const updateContactDataForm = (e: ChangeEvent<HTMLInputElement>) => {
  const {
    value = '',
    dataset: { set = '' },
    name = '',
  } = e.currentTarget as any;
  return {
    type: contactDataReducerActionTypes.UPDATE_CONTACT_FORM,
    payload: { set, name, value },
  };
};
export const resetContactDataForm = () => {
  return {
    type: contactDataReducerActionTypes.RESET_CONTACT_FORM,
  };
};
