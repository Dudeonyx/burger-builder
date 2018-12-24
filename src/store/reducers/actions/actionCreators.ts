import { Dispatch } from 'redux';
import { ChangeEvent } from 'react';

import { IingredientsKeys, Iingredients } from '../../../types/ingredients';
import { IingredientReducerAction } from '../ingredientReducer/types';
import { actionTypes } from './index';
import axios from '../../../axios-orders';
import { IActions } from './types';
import { IstoreState } from '../../types';
import { selectPresubmitOrder } from '../../selectors/selectors';
import {
  IDbOrder,
  IordersReducerAction,
  IDbOrders,
  IformattedOrder,
} from '../ordersReducer/types';

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

export const updateContactDataForm = (
  e: ChangeEvent<HTMLInputElement>,
): IActions => {
  const { value = '', name = '' } = e.currentTarget as any;
  return {
    type: actionTypes.UPDATE_CONTACT_FORM,
    payload: { name, value },
  };
};
export const resetContactDataForm = (): IActions => {
  return {
    type: actionTypes.RESET_CONTACT_FORM,
  };
};

export const orderSuccessful = (name: string, order: IDbOrder): IActions => {
  return {
    type: actionTypes.ORDER_SUCCESSFUL,
    payload: {
      name,
      order,
    },
  };
};
export const orderFailed = (error: Error | false): IActions => {
  return {
    type: actionTypes.ORDER_FAILED,
    payload: {
      error,
    },
  };
};
export const generatePresubmitOrder = (
  ingredients: Iingredients,
  totalPrice: string,
): IActions => {
  return {
    type: actionTypes.GENERATE_PRESUBMIT_ORDER,
    payload: {
      ingredients,
      totalPrice,
    },
  };
};

export const setOrderSubmitting = (): IActions => {
  return {
    type: actionTypes.SET_ORDER_SUBMITTING,
  };
};

export const submitOrder = (
  ingredients: Iingredients,
  totalPrice: string,
): Promise<VoidFunction> => {
  return (async (dispatch: Dispatch<IActions>, getState: () => IstoreState) => {
    try {
      dispatch(generatePresubmitOrder(ingredients, totalPrice));
      dispatch(setOrderSubmitting());
      const order = selectPresubmitOrder(getState());
      if (!order) {
        throw new Error(
          'An error occurred while generating your order, pls try again',
        );
      }
      const response = await axios.post('/orders.json', order);
      const {
        data: { name },
      } = response;
      dispatch(orderSuccessful(name, order));
      dispatch(resetContactDataForm());
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);
      dispatch(orderFailed(error));
    }
  }) as any;
};

export const setOrders = (orders: IDbOrders): IordersReducerAction => {
  return {
    type: actionTypes.SET_ORDERS,
    payload: {
      orders,
    },
  };
};

export const setOrdersLoading = (): IordersReducerAction => {
  return {
    type: actionTypes.SET_ORDERS_LOADING,
  };
};

export const setFormattedOrders = (
  formattedOrders: IformattedOrder[],
): IordersReducerAction => {
  return {
    type: actionTypes.SET_FORMATTEDORDERS,
    payload: {
      formattedOrders,
    },
  };
};

export const fetchOrders = () => {
  return async (dispatch: Dispatch<IordersReducerAction>) => {
    try {
      type T = string;
      dispatch(setOrdersLoading());
      const response = await axios.get<IDbOrders>('/orders.json');
      const { data } = response;
      dispatch(setOrders(data));
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.error(error);
    }
  };
};
