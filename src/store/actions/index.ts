import {
  IingredientReducerAction,
  IingredientReducerState,
} from '../reducers/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { store } from '../store';
import { ImapDispatchIngredients } from './types';
import { IingredientsKeys, Iingredients } from '../../types/ingredients';

export interface IingActions {
  INCREASE_INGREDIENTS: 'INCREASE_INGREDIENTS';
  DECREASE_INGREDIENTS: 'DECREASE_INGREDIENTS';
  STORE_INGREDIENTS: 'STORE_INGREDIENTS';
}

export const ingredientActions: IingActions = {
  INCREASE_INGREDIENTS: 'INCREASE_INGREDIENTS',
  DECREASE_INGREDIENTS: 'DECREASE_INGREDIENTS',
  STORE_INGREDIENTS: 'STORE_INGREDIENTS',
};

export const mapIngredientsStateToProps = (state: IingredientReducerState) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
});

export const ingredientIncreaseHandler = (igkey: IingredientsKeys) => {
  return store.dispatch({
    type: ingredientActions.INCREASE_INGREDIENTS,
    payload: { igkey },
  });
};
export const ingredientDecreaseHandler = (igkey: IingredientsKeys) => {
  return store.dispatch({
    type: ingredientActions.DECREASE_INGREDIENTS,
    payload: { igkey },
  });
};
export const ingredientStoreHandler = (ingredients: Iingredients) => {
  return store.dispatch({
    type: ingredientActions.STORE_INGREDIENTS,
    payload: { ingredients },
  });
};

export const mapIngredientsDispatchToProps = (
  dispatch: Dispatch<IingredientReducerAction>,
): ImapDispatchIngredients => ({
  ingredientIncreaseHandler: igkey =>
    dispatch({
      type: ingredientActions.INCREASE_INGREDIENTS,
      payload: { igkey },
    }),
  ingredientDecreaseHandler: igkey =>
    dispatch({
      type: ingredientActions.DECREASE_INGREDIENTS,
      payload: { igkey },
    }),
  ingredientStoreHandler: ingredients =>
    dispatch({
      type: ingredientActions.STORE_INGREDIENTS,
      payload: { ingredients },
    }),
});

export const connectIngredients = connect(
  mapIngredientsStateToProps,
  mapIngredientsDispatchToProps,
);
