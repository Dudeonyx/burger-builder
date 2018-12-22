import { Dispatch } from 'redux';
import { ChangeEvent } from 'react';

import { IingredientsKeys, Iingredients } from '../../../types/ingredients';
import { IingredientReducerAction } from '../ingredientReducer/types';
import { actionTypes } from './index';
import axios from '../../../axios-orders';
import { IActions } from './types';
import { IstoreState } from '../../types';
import { getSubmitOrderState } from '../../selectors/selectors';
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
  error: boolean,
): IingredientReducerAction => {
  return {
    type: actionTypes.SET_ERROR,
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
  const {
    value = '',
    dataset: { set = '' },
    name = '',
  } = e.currentTarget as any;
  return {
    type: actionTypes.UPDATE_CONTACT_FORM,
    payload: { set, name, value },
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

export const setOrderSubmitting = (): IActions => {
  return {
    type: actionTypes.SET_ORDER_SUBMITTING,
  };
};

export const submitOrder = (): Promise<VoidFunction> => {
  return (async (dispatch: Dispatch<IActions>, getState: () => IstoreState) => {
    try {
      const { customer, ingredients, totalPrice } = getSubmitOrderState(
        getState(),
      );
      const { deliveryMethod, basicInfo, address } = customer;

      if (!ingredients) {
        throw new Error('Empty Ingredients object!!!');
      }

      const order: IDbOrder = {
        basicInfo: {
          name: basicInfo.name.value,
          phone: basicInfo.phone.value,
          email: basicInfo.email.value,
        },
        address: {
          street: address.street.value,
          city: address.city.value,
          state: address.state.value,
          country: address.country.value,
        },
        deliveryMethod: deliveryMethod.deliveryMethod.value,
        ingredients,
        price: totalPrice,
        date: Date(),
      };
      dispatch(setOrderSubmitting());
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

      const formattedOrders: IformattedOrder[] = (Object.entries(data) as Array<
        [T, IDbOrders[T]]
      >)
        .reverse()
        .slice()
        .map(
          ([
            id,
            {
              basicInfo: { name },
              ingredients,
              price: totalPrice,
            },
          ]) => ({ id, name, ingredients, totalPrice }),
        );
      // dispatch(setOrders(data));
      dispatch(setFormattedOrders(formattedOrders));
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.error(error);
    }
  };
};
