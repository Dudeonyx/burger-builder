// import styled from 'styled-components';
import React, { MouseEvent, Component, ChangeEvent, FC, useCallback, useContext } from 'react';
import Button from '../../../components/UI/Button/Button';
import Loader from '../../../components/UI/Loader/Loader';
import Modal from '../../../components/UI/Modal/Modal';
import { IContactDataState } from './types';
// import { submitBurgerOrder } from '../../../store/actions';
import { connect } from 'react-redux';
import { GetConnectProps } from '../../../store/';
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
} from '../../../store/selectors/';
import { mapToInputs } from '../../../components/UI/Input/';
import { IStore } from '../../../store/store';
import { useForm } from '../../../shared/CustomHooks';
import { submitBurgerOrder } from '../../../store/actions';
import { Iingredients } from '../../../types/ingredients';
const ContactData: FC<IContactDataProps> = props => {
  const [formState, setForm,] = useForm(
    'name',
    'phone',
    'email',
    'street',
    'city',
    'country',
    'state',
    'deliveryMethod',
  );
  const { city, country, deliveryMethod, email, name, phone, state, street } = formState;

  const mapToInput = useCallback(mapToInputs(setForm), [setForm,]);

  const cancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // tslint:disable-next-line: no-unused-expression
    e.currentTarget.form && e.currentTarget.form.reset();
    props.history.goBack();
  };

  const submitBurger = async (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.form && e.currentTarget.form.reportValidity()) {
      try {
        e.preventDefault();
        if (!props.ingredients) {
          throw new Error('Empty Ingredients object!!!');
        }
        await submitBurgerOrder(
          formState,
          props.ingredients,
          props.totalPrice,
          props.token,
          props.userId,
        );
        if (props.error) {
          throw props.error;
        }
        props.history.push('/all-orders');
      } catch (error) {
        // tslint:disable-next-line:no-console
        console.error('[submitBurger (ContactData)]', error);
      }
    }
  };

  const form = props.submitting ? (
    <Loader />
  ) : (
    <form id="order_form">
      <h3>Enter Your Contact Details to Complete Your Order.</h3>
      {[name, email, phone,].map(mapToInput)}
      <fieldset>
        <legend>Address</legend>
        {[street, city, state, country,].map(mapToInput)}
      </fieldset>
      <fieldset>
        <legend>Delivery Method</legend>
        {[deliveryMethod,].map(mapToInput)}
      </fieldset>

      <div>
        <Button type="reset" children="CANCEL" onClick={cancel} btnType="Danger" />
        <Button type="submit" children="ORDER" onClick={submitBurger} btnType="Success" />
      </div>
    </form>
  );
  return (
    <StyledContactData>
      <Modal show={true} hider={cancel} bgColor="white" minWidth={650}>
        {form}
      </Modal>
    </StyledContactData>
  );
};

export interface IContactDataProps extends RouteComponentProps {
  totalPrice: string;
  submitting: boolean;
  ingredients: Iingredients | null;
  token: string | null;
  error: false | Error;
  userId: string | null;
  submitBurgerOrder: typeof submitBurgerOrder;
}

export default withErrorHandler(ContactData, axios);
