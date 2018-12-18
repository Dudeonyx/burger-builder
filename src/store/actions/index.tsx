import { IingredientsKeys } from '../../components/Burger/BuildControls/BuildControls';
import {
  IingredientReducerAction,
  IingredientReducerState,
} from '../reducers/ingredientReducer';
import { Iingredients } from '../../containers/BurgerBuilder/BurgerBuilder';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

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

export const mapStateToProps = (state: IingredientReducerState) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
});

export interface ImapDispatchIngredients {
  ingredientIncreaseHandler: (
    igkey: IingredientsKeys,
  ) => IingredientReducerAction;
  ingredientDecreaseHandler: (
    igkey: IingredientsKeys,
  ) => IingredientReducerAction;
  ingredientStoreHandler: (
    ingredients: Iingredients,
  ) => IingredientReducerAction;
}

export const mapDispatchToProps = (
  dispatch: Dispatch<IingredientReducerAction>,
): ImapDispatchIngredients => ({
  ingredientIncreaseHandler: igkey =>
    dispatch({ type: ingredientActions.INCREASE, payload: { igkey } }),
  ingredientDecreaseHandler: igkey =>
    dispatch({ type: ingredientActions.DECREASE, payload: { igkey } }),
  ingredientStoreHandler: ingredients =>
    dispatch({ type: ingredientActions.STORE, payload: { ingredients } }),
});

export type IconnectIngredientsProps<T> = ImapDispatchIngredients &
  IingredientReducerState &
  T;

export const connectIngredients = connect(
  mapStateToProps,
  mapDispatchToProps,
);
