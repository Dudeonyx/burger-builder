import { IingredientsKeys } from '../../components/Burger/BuildControls/BuildControls';
import {
  IingredientReducerAction,
  IingredientReducerState,
} from '../reducers/types';
import { Iingredients } from '../../containers/BurgerBuilder/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { store } from '../store';
import { ImapDispatchIngredients } from './types';

export interface IingActions {
  INCREASE: 'INCREASE';
  DECREASE: 'DECREASE';
  STORE: 'STORE';
}

export const ingredientActions: IingActions = {
  INCREASE: 'INCREASE',
  DECREASE: 'DECREASE',
  STORE: 'STORE',
};

export const mapIngredientsStateToProps = (state: IingredientReducerState) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
});

export const ingredientIncreaseHandler = (igkey: IingredientsKeys) => {
  return store.dispatch({
    type: ingredientActions.INCREASE,
    payload: { igkey },
  });
};
export const ingredientDecreaseHandler = (igkey: IingredientsKeys) => {
  return store.dispatch({
    type: ingredientActions.DECREASE,
    payload: { igkey },
  });
};
export const ingredientStoreHandler = (ingredients: Iingredients) => {
  return store.dispatch({
    type: ingredientActions.STORE,
    payload: { ingredients },
  });
};

export const mapIngredientsDispatchToProps = (
  dispatch: Dispatch<IingredientReducerAction>,
): ImapDispatchIngredients => ({
  ingredientIncreaseHandler: igkey =>
    dispatch({ type: ingredientActions.INCREASE, payload: { igkey } }),
  ingredientDecreaseHandler: igkey =>
    dispatch({ type: ingredientActions.DECREASE, payload: { igkey } }),
  ingredientStoreHandler: ingredients =>
    dispatch({ type: ingredientActions.STORE, payload: { ingredients } }),
});

export const connectIngredients = connect(
  mapIngredientsStateToProps,
  mapIngredientsDispatchToProps,
);
