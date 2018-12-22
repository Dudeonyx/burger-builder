import { Dispatch } from 'redux';
import { ChangeEvent } from 'react';

import { IingredientsKeys, Iingredients } from '../../../types/ingredients';
import { IingredientReducerAction } from '../ingredientReducer/types';
import { ActionTypes } from './index';
import axios from '../../../axios-orders';
import { IDbOrder } from '../../../containers/Orders/types';
import { IContactDataReducerState } from '../contactDataReducer/types';
import { IActions } from './types';
import { IstoreState } from '../../types';
import {
  getContactDataState,
  getSubmitOrderState,
} from '../../selectors/selectors';

export const ingredientIncreaseHandler = (
  igkey: IingredientsKeys,
): IingredientReducerAction => {
  return {
    type: ActionTypes.INCREASE_INGREDIENT,
    payload: { igkey },
  };
};
export const ingredientDecreaseHandler = (
  igkey: IingredientsKeys,
): IingredientReducerAction => {
  return {
    type: ActionTypes.DECREASE_INGREDIENT,
    payload: { igkey },
  };
};
export const ingredientSetHandler = (
  ingredients: Iingredients | null,
): IingredientReducerAction => {
  return {
    type: ActionTypes.SET_INGREDIENTS,
    payload: { ingredients },
  };
};
export const ingredientErrorHandler = (
  error: boolean,
): IingredientReducerAction => {
  return {
    type: ActionTypes.SET_ERROR,
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
    type: ActionTypes.UPDATE_CONTACT_FORM,
    payload: { set, name, value },
  };
};
export const resetContactDataForm = (): IActions => {
  return {
    type: ActionTypes.RESET_CONTACT_FORM,
  };
};

export const orderSuccessful = (name: string, order: IDbOrder): IActions => {
  return {
    type: ActionTypes.ORDER_SUCCESSFUL,
    payload: {
      name,
      order,
    },
  };
};
export const orderFailed = (error: Error | false): IActions => {
  return {
    type: ActionTypes.ORDER_FAILED,
    payload: {
      error,
    },
  };
};

export const setOrderSubmitting = (submitting: boolean): IActions => {
  return {
    type: ActionTypes.SET_SUBMITTING,
    payload: {
      submitting,
    },
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
      dispatch(setOrderSubmitting(true));
      const response = await axios.post('/orders.json', order);
      // tslint:disable-next-line: no-console
      console.log(response);
      const {
        data: { name },
      } = response;
      dispatch(orderSuccessful(name, order));
      dispatch(setOrderSubmitting(false));
      dispatch(resetContactDataForm());
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);
      dispatch(orderFailed(error));
      dispatch(setOrderSubmitting(false));
    }
  }) as any;
};
