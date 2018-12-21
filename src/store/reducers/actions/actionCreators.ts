import { Dispatch } from 'redux';
import { ChangeEvent, MouseEvent } from 'react';

import { IingredientsKeys, Iingredients } from '../../../types/ingredients';
import { IingredientReducerAction } from '../ingredientReducer/types';
import { contactDataReducerActionTypes, ingredientActionTypes } from './index';
import axios from '../../../axios-orders';
import { IDbOrder } from '../../../containers/Orders/types';
import {
  IcontactDataReducerAction,
  IContactDataReducerState,
} from '../contactDataReducer/types';

export const ingredientIncreaseHandler = (
  igkey: IingredientsKeys,
): IingredientReducerAction => {
  return {
    type: ingredientActionTypes.INCREASE_INGREDIENT,
    payload: { igkey },
  };
};
export const ingredientDecreaseHandler = (
  igkey: IingredientsKeys,
): IingredientReducerAction => {
  return {
    type: ingredientActionTypes.DECREASE_INGREDIENT,
    payload: { igkey },
  };
};
export const ingredientSetHandler = (
  ingredients: Iingredients | null,
): IingredientReducerAction => {
  return {
    type: ingredientActionTypes.SET_INGREDIENTS,
    payload: { ingredients },
  };
};
export const ingredientErrorHandler = (
  error: boolean,
): IingredientReducerAction => {
  return {
    type: ingredientActionTypes.SET_ERROR,
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

export const updateContactDataForm = (
  e: ChangeEvent<HTMLInputElement>,
): IcontactDataReducerAction => {
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
export const resetContactDataForm = (): IcontactDataReducerAction => {
  return {
    type: contactDataReducerActionTypes.RESET_CONTACT_FORM,
  };
};

export const orderSuccessful = (
  name: string,
  order: IDbOrder,
): IcontactDataReducerAction => {
  return {
    type: 'ORDER_SUCCESSFUL',
    payload: {
      name,
      order,
    },
  };
};
export const orderFailed = (
  error: Error | false,
): IcontactDataReducerAction => {
  return {
    type: 'ORDER_FAILED',
    payload: {
      error,
    },
  };
};

export const submitOrder = (order: IDbOrder): Promise<VoidFunction> => {
  return (async (dispatch: Dispatch<IcontactDataReducerAction>) => {
    try {
      // this.setState({ loading: true });
      const response = await axios.post('/orders.json', order);
      // tslint:disable-next-line: no-console
      console.log(response);
      const {
        data: { name },
      } = response;
      dispatch(orderSuccessful(name, order));
      dispatch(resetContactDataForm());
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);
      dispatch(orderFailed(error));
      // this.setState({ loading: false });
    }
  }) as any;
};
