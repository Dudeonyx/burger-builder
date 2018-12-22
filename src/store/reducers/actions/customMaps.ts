import { bindActionCreators, Dispatch } from 'redux';
import { IstoreState } from '../../types';
import { getContactDataState } from '../../selectors/selectors';
import {
  ingredientIncreaseHandler,
  ingredientDecreaseHandler,
  ingredientSetHandler,
} from './index';
import { IingredientReducerAction } from '../ingredientReducer/types';

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
