import { IcontactDataReducerActionTypes } from './types';
import { IstoreState, GetConnectProps } from '../../../types';
import { Dispatch } from 'redux';
import { IcontactDataReducerAction } from '../types';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';

export const contactDataReducerActionTypes: IcontactDataReducerActionTypes = {
  UPDATE_CONTACT_FORM: 'UPDATE_CONTACT_FORM',
  RESET_CONTACT_FORM: 'RESET_CONTACT_FORM',
};

export const mapContactDataStateToProps = (state: IstoreState) => ({
  customer: state.cData.customer,
});

export const mapContactDataDispatchToProps = (
  dispatch: Dispatch<IcontactDataReducerAction>,
) => ({
  updateForm: (e: ChangeEvent<HTMLInputElement>) => {
    const { value = '' } = e.currentTarget;
    const { name }: any = e.currentTarget;
    const { set = '' }: any = e.currentTarget.dataset;
    return dispatch({
      type: contactDataReducerActionTypes.UPDATE_CONTACT_FORM,
      payload: { set, name, value },
    });
  },
  resetForm: () =>
    dispatch({ type: contactDataReducerActionTypes.RESET_CONTACT_FORM }),
});

export const connectContactData = connect(
  mapContactDataStateToProps,
  mapContactDataDispatchToProps,
);
export type connectContactDataProps = GetConnectProps<
  typeof connectContactData
>;
