import { IcontactDataReducerActionTypes } from './types';
import { IstoreState, GetConnectProps } from '../../../types';
import { Dispatch } from 'redux';
import { IcontactDataReducerAction } from '../types';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { store } from '../../../store';

export const contactDataReducerActionTypes: IcontactDataReducerActionTypes = {
  UPDATE_CONTACT_FORM: 'UPDATE_CONTACT_FORM',
  RESET_CONTACT_FORM: 'RESET_CONTACT_FORM',
};

export const mapContactDataStateToProps = (state: IstoreState) => ({
  customer: state.cData.customer,
  ingredients: state.ings.ingredients,
  totalPrice: state.ings.totalPrice,
});

export const updateContactDataForm = (e: ChangeEvent<HTMLInputElement>) => {
  const { value = '' } = e.currentTarget;
  const { name }: any = e.currentTarget;
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
export type connectContactDataProps = GetConnectProps<
  typeof connectContactData
>;
