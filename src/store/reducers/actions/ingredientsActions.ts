import { Dispatch } from 'redux';
import { IingredientsKeys, Iingredients } from '../../../types/ingredients';
import { IingredientReducerAction } from '../ingredientReducer/types';
import { actionTypes } from './index';
import axios from '../../../axios-orders';

export const ingredientIncreaseHandler = (
  igkey: IingredientsKeys,
): IingredientReducerAction => {
  return {
    type: actionTypes.INCREASE_INGREDIENT,
    payload: { igkey },
  };
};
export const ingredientDecreaseHandler = (
  igkey: IingredientsKeys,
): IingredientReducerAction => {
  return {
    type: actionTypes.DECREASE_INGREDIENT,
    payload: { igkey },
  };
};
export const ingredientSetHandler = (
  ingredients: Iingredients | null,
): IingredientReducerAction => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: { ingredients },
  };
};
export const ingredientErrorHandler = (
  error: boolean = true,
): IingredientReducerAction => {
  return {
    type: actionTypes.SET_INGREDIENTS_ERROR,
    payload: { error },
  };
};

export const fetchIngredientsHandler = (): Promise<VoidFunction> => {
  return (async (dispatch: Dispatch<IingredientReducerAction>) => {
    // this.setState({ error: null });
    dispatch(ingredientErrorHandler(false));
    try {
      const response = await axios.get<Iingredients>('/ingredients.json');
      const { data: newIngredients } = response;
      dispatch(ingredientSetHandler(newIngredients));
    } catch (error) {
      dispatch(ingredientErrorHandler(true));
    }
  }) as any;
};
