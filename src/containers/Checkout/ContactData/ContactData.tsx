// import styled from 'styled-components/macro';
import React, { MouseEvent, Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Loader from '../../../components/UI/Loader/Loader';
import Modal from '../../../components/UI/Modal/Modal';
import { IContactDataState } from './types';
import {
  updateContactDataForm,
  resetContactDataForm,
  submitOrder,
} from '../../../store/reducers/actions';
import { connect } from 'react-redux';
import { GetConnectProps } from '../../../store/types';
import { RouteComponentProps } from 'react-router';
import { IActions } from '../../../store/reducers/actions/types';
import { Dispatch, bindActionCreators } from 'redux';
import withErrorHandler from '../../../HOCs/withErrorHandler';
import axios from '../../../axios-orders';
import { StyledContactData } from './ContactData.styles';
import {
  selectCustomer,
  selectSubmitting,
  selectIngredients,
  getTotalPriceFromStore,
} from '../../../store/selectors/selectors';
import { createSelector } from 'reselect';
import mapToInputs from '../../../components/UI/Input/mapToInputs';
class ContactData extends Component<IContactDataProps, IContactDataState> {
  public render() {
    const {
      name,
      city,
      country,
      deliveryMethod,
      email,
      phone,
      state,
      street,
    } = this.props.customer;

    const form = this.props.submitting ? (
      <Loader />
    ) : (
      <form id="order_form">
        <h3>Enter Your Contact Details to Complete Your Order.</h3>
        {[name, email, phone,].map(this.mapToInput)}
        <fieldset>
          <legend>Address</legend>
          {[street, city, state, country,].map(this.mapToInput)}
        </fieldset>
        <fieldset>
          <legend>Delivery Method</legend>
          {[deliveryMethod,].map(this.mapToInput)}
        </fieldset>

        <div>
          <Button
            type="reset"
            children="CANCEL"
            onClick={this.cancel}
            btnType="Danger"
          />
          <Button
            type="submit"
            children="ORDER"
            onClick={this.submit}
            btnType="Success"
          />
        </div>
      </form>
    );
    return (
      <StyledContactData>
        <Modal show={true} hider={this.cancel} bgColor="white" minWidth={650}>
          {form}
        </Modal>
      </StyledContactData>
    );
  }
  private mapToInput = mapToInputs(this.props.updateContactDataForm);
  private cancel = (e: MouseEvent<Element>) => {
    e.preventDefault();
    this.props.resetContactDataForm();
    this.props.history.goBack();
  };
  private submit = async (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.form && e.currentTarget.form.reportValidity()) {
      try {
        e.preventDefault();
        if (!this.props.ingredients) {
          throw new Error('Empty Ingredients object!!!');
        }
        await this.props.submitOrder(
          this.props.ingredients,
          this.props.totalPrice,
        );
        this.props.history.push('/all-orders');
      } catch (error) {
        // tslint:disable-next-line:no-console
        console.error(error);
      }
    }
  };
}

export const getContactDataState = createSelector(
  selectCustomer,
  selectSubmitting,
  selectIngredients,
  getTotalPriceFromStore,
  (customer, submitting, ingredients, totalPrice) => {
    return {
      customer,
      submitting,
      ingredients,
      totalPrice,
    };
  },
);

const mapContactDataDispatchToProps = (dispatch: Dispatch<IActions>) => {
  return bindActionCreators(
    {
      updateContactDataForm,
      resetContactDataForm,
      submitOrder,
    },
    dispatch,
  );
};

const connectContactData = connect(
  getContactDataState,
  mapContactDataDispatchToProps,
);
export type IContactDataProps = RouteComponentProps &
  GetConnectProps<typeof connectContactData>;

export default connectContactData(withErrorHandler(ContactData, axios));
