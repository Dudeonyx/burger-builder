import { Dispatch } from 'redux';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { IstoreState, GetConnectProps } from '../../types';
import {
  getBurgerBuilderPropsFromState,
  getContactDataPropsFromState,
} from '../../selectors/selectors';
import { IingredientsKeys, Iingredients } from '../../../types/ingredients';
import { store } from '../../store';
import { IingredientReducerAction } from '../ingredientReducer/types';
import { IcontactDataReducerAction } from '../contactDataReducer/types';
import {
  contactDataReducerActionTypes,
  ingredientActionTypes,
} from './actionTypes';

export const ingredientIncreaseHandler = (igkey: IingredientsKeys) => {
  return store.dispatch<IingredientReducerAction>({
    type: ingredientActionTypes.INCREASE_INGREDIENT,
    payload: { igkey },
  });
};
export const ingredientDecreaseHandler = (igkey: IingredientsKeys) => {
  return store.dispatch<IingredientReducerAction>({
    type: ingredientActionTypes.DECREASE_INGREDIENT,
    payload: { igkey },
  });
};
export const ingredientStoreHandler = (ingredients: Iingredients | null) => {
  return store.dispatch<IingredientReducerAction>({
    type: ingredientActionTypes.SET_INGREDIENTS,
    payload: { ingredients },
  });
};

export const updateContactDataForm = (e: ChangeEvent<HTMLInputElement>) => {
  const { value = '' } = e.currentTarget;
  const { name = '' }: any = e.currentTarget;
  const { set = '' }: any = e.currentTarget.dataset;
  return store.dispatch<IcontactDataReducerAction>({
    type: contactDataReducerActionTypes.UPDATE_CONTACT_FORM,
    payload: { set, name, value },
  });
};
export const resetContactDataForm = () => {
  return store.dispatch<IcontactDataReducerAction>({
    type: contactDataReducerActionTypes.RESET_CONTACT_FORM,
  });
};

export const mapIngredientsStateToProps = (state: IstoreState) => {
  return getBurgerBuilderPropsFromState(state);
};

export const mapContactDataStateToProps = (state: IstoreState) => {
  return getContactDataPropsFromState(state);
};
export const mapContactDataDispatchToProps = (
  _dispatch: Dispatch<IcontactDataReducerAction>,
) => ({
  updateContactDataForm,
  resetContactDataForm,
});

export const connectContactData = connect(
  mapContactDataStateToProps,
  mapContactDataDispatchToProps,
);
export type TConnectContactDataProps = GetConnectProps<
  typeof connectContactData
>;

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
