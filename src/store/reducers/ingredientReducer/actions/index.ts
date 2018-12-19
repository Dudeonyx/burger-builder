import { IingredientReducerAction, IingredientReducerState } from '../types';
import { connect } from 'react-redux';
import { store } from '../../../store';
import { IingredientsKeys, Iingredients } from '../../../../types/ingredients';
import { IingActionTypes, ImapDispatchIngredients } from './types';
import { IstoreState } from '../../../types';
import { Dispatch } from 'redux';

export const ingredientActionTypes = Object.freeze<IingActionTypes>({
  INCREASE_INGREDIENTS: 'INCREASE_INGREDIENTS',
  DECREASE_INGREDIENTS: 'DECREASE_INGREDIENTS',
  STORE_INGREDIENTS: 'STORE_INGREDIENTS',
});

export const mapIngredientsStateToProps = (state: IstoreState) => ({
  ingredients: state.ings.ingredients,
  totalPrice: state.ings.totalPrice,
});

export const ingredientIncreaseHandler = (igkey: IingredientsKeys) => {
  return store.dispatch<IingredientReducerAction>({
    type: ingredientActionTypes.INCREASE_INGREDIENTS,
    payload: { igkey },
  });
};
export const ingredientDecreaseHandler = (igkey: IingredientsKeys) => {
  return store.dispatch<IingredientReducerAction>({
    type: ingredientActionTypes.DECREASE_INGREDIENTS,
    payload: { igkey },
  });
};
export const ingredientStoreHandler = (ingredients: Iingredients | null) => {
  return store.dispatch<IingredientReducerAction>({
    type: ingredientActionTypes.STORE_INGREDIENTS,
    payload: { ingredients },
  });
};

export const mapIngredientsDispatchToProps = (
  _dispatch: Dispatch<IingredientReducerAction>,
) => ({
  ingredientIncreaseHandler,
  ingredientDecreaseHandler,
  ingredientStoreHandler,
});

export const connectIngredients = connect(
  mapIngredientsStateToProps,
  mapIngredientsDispatchToProps,
);
