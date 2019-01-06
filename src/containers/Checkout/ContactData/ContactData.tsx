// import styled from 'styled-components/macro';
import React, { MouseEvent, Component, ChangeEvent } from 'react';
import Button from '../../../components/UI/Button/Button';
import Loader from '../../../components/UI/Loader/Loader';
import Modal from '../../../components/UI/Modal/Modal';
import { IContactDataState } from './types';
import { submitBurgerOrder } from '../../../store/reducers/actions';
import { connect } from 'react-redux';
import { GetConnectProps } from '../../../store/types';
import { RouteComponentProps } from 'react-router';
import withErrorHandler from '../../../HOCs/withErrorHandler';
import axios from '../../../axios-orders';
import { StyledContactData } from './ContactData.styles';
import {
  selectBurgerOrderSubmitting,
  selectIngredients,
  getTotalPriceFromStore,
  selectAuthIdToken,
  selectBurgerOrderError,
  selectAuthUserId,
} from '../../../store/selectors/selectors';
import mapToInputs from '../../../components/UI/Input/mapToInputs';
import { updateform } from '../../../components/UI/Input/InputUtilities';
import { IStore } from '../../../store/store';
class ContactData extends Component<IContactDataProps, IContactDataState> {
  public state: IContactDataState = {
    customer: {
      name: {
        value: '',
        type: 'text',
        placeholder: 'Your Name',
        id: 'customer_name_id',
        name: 'name',
        label: 'Name:',
        dataSet: 'basicInfo',
        validation: {
          required: true,
          valid: false,
          touched: false,
          minLength: 5,
        },
      },
      phone: {
        value: '',
        type: 'tel',
        placeholder: 'Your Phone no.',
        id: 'customer_phone_id',
        name: 'phone',
        label: 'Phone no.:',
        dataSet: 'basicInfo',
        validation: {
          required: true,
          valid: false,
          touched: false,
          minLength: 5,
          isNumeric: true,
        },
      },
      email: {
        value: '',
        type: 'email',
        placeholder: 'Your Email',
        id: 'customer_email_id',
        name: 'email',
        label: 'Email:',
        dataSet: 'basicInfo',
        validation: {
          required: true,
          valid: false,
          touched: false,
          minLength: 5,
          isEmail: true,
        },
      },
      street: {
        value: '',
        type: 'street-address',
        placeholder: 'Your Street',
        id: 'customer_street_id',
        name: 'street',
        label: 'Street:',
        dataSet: 'address',
        validation: {
          required: true,
          valid: false,
          touched: false,
          minLength: 3,
        },
      },
      city: {
        value: '',
        type: 'text',
        placeholder: 'Your City',
        id: 'customer_city_id',
        name: 'city',
        label: 'City:',
        dataSet: 'address',
        validation: {
          required: true,
          valid: false,
          touched: false,
          minLength: 3,
        },
      },
      state: {
        value: '',
        type: 'text',
        placeholder: 'Your State/Province',
        id: 'customer_state_id',
        name: 'state',
        label: 'State/\nProvince:',
        dataSet: 'address',
        validation: {
          required: true,
          valid: false,
          touched: false,
          minLength: 3,
        },
      },
      country: {
        value: '',
        type: 'country-name',
        placeholder: 'Your Country',
        id: 'customer_country_id',
        name: 'country',
        label: 'Country:',
        dataSet: 'address',
        validation: {
          required: true,
          valid: false,
          touched: false,
          minLength: 3,
        },
      },

      deliveryMethod: {
        id: 'customer_deliveryMethod_id',
        label: '',
        value: 'normal',
        type: 'select',
        name: 'deliveryMethod',
        dataSet: 'deliveryMethod',
        validation: {
          required: true,
          valid: true,
          touched: true,
        },
        options: [
          {
            value: 'cheapest',
            id: 'cheapest_id',
            label: 'Cheapest',
            checked: false,
          },
          {
            value: 'cheap',
            id: 'cheap_id',
            label: 'Cheap',
            checked: false,
          },
          {
            value: 'normal',
            id: 'normal_id',
            label: 'Normal',
            checked: true,
          },
          {
            value: 'expensive',
            id: 'expensive_id',
            label: 'Expensive',
            checked: false,
          },
          {
            value: 'very_expensive',
            id: 'very_expensive_id',
            label: 'Very Expensive',
            checked: false,
          },
        ],
      },
    },
  };
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
    } = this.state.customer;

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
            onClick={this.submitBurger}
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

  private updateContactDataForm = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedCustomer = updateform(this.state.customer, e);
    this.setState({ customer: updatedCustomer });
  };

  private mapToInput = mapToInputs(this.updateContactDataForm);

  private cancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // tslint:disable-next-line: no-unused-expression
    e.currentTarget.form && e.currentTarget.form.reset();
    this.props.history.goBack();
  };

  private submitBurger = async (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.form && e.currentTarget.form.reportValidity()) {
      try {
        e.preventDefault();
        if (!this.props.ingredients) {
          throw new Error('Empty Ingredients object!!!');
        }
        await this.props.submitBurgerOrder(
          this.state.customer,
          this.props.ingredients,
          this.props.totalPrice,
          this.props.token,
          this.props.userId,
        );
        if (this.props.error) {
          throw this.props.error;
        }
        this.props.history.push('/all-orders');
      } catch (error) {
        // tslint:disable-next-line:no-console
        console.error('[submitBurger (ContactData)]', error);
      }
    }
  };
}

export const mapContactDataStateToProps = (state: IStore) => {
  return {
    submitting: selectBurgerOrderSubmitting(state),
    ingredients: selectIngredients(state),
    totalPrice: getTotalPriceFromStore(state),
    token: selectAuthIdToken(state),
    error: selectBurgerOrderError(state),
    userId: selectAuthUserId(state),
  };
};

const mapContactDataDispatchToProps = {
  submitBurgerOrder,
};

const connectContactData = connect(
  mapContactDataStateToProps,
  mapContactDataDispatchToProps,
);
export type IContactDataProps = RouteComponentProps &
  GetConnectProps<typeof connectContactData>;

export default connectContactData(withErrorHandler(ContactData, axios));
