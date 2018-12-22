import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IstoreState } from '../../types';
import {
  getIngredientState,
  getContactDataState,
} from '../../selectors/selectors';
import {
  ingredientIncreaseHandler,
  ingredientDecreaseHandler,
  ingredientSetHandler,
} from './index';
import { IingredientReducerAction } from '../ingredientReducer/types';

export const mapIngredientsStateToProps = (state: IstoreState) => {
  return getIngredientState(state);
};

export const mapContactDataStateToProps = (state: IstoreState) => {
  return getContactDataState(state);
};

export const mapIngredientsDispatchToProps = (
  dispatch: Dispatch<IingredientReducerAction>,
) =>
  bindActionCreators(
    {
      ingredientIncreaseHandler,
      ingredientDecreaseHandler,
      ingredientSetHandler,
    },
    dispatch as Dispatch,
  );

export const connectIngredients = connect(
  mapIngredientsStateToProps,
  mapIngredientsDispatchToProps,
);
