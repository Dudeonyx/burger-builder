// import styled from 'styled-components';
import React, { MouseEvent, FC, useCallback } from 'react';
import Button from '../../../components/UI/Button/Button';
import Loader from '../../../components/UI/Loader/Loader';
import Modal from '../../../components/UI/Modal/Modal';
import { RouteComponentProps } from 'react-router';
import withErrorHandler from '../../../HOCs/withErrorHandler';
import axios from '../../../axios-orders';
import { StyledContactData } from './ContactData.styles';
import { makeMapToInputs } from '../../../components/UI/Input/';
import { useForm, useCheckRefEquality } from '../../../shared/CustomHooks';
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
    ['deliveryMethod', 'very_expensive',],
  );
  const { city, country, deliveryMethod, email, name, phone, state, street } = formState;

  useCheckRefEquality(city, 'city');

  const mapToInput = useCallback(makeMapToInputs(setForm), [setForm,]);

  useCheckRefEquality(mapToInput, 'mapToInput');

  const cancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      // tslint:disable-next-line: no-unused-expression
      e.currentTarget.form && e.currentTarget.form.reset();
      props.history.goBack();
    },
    [props.history,],
  );
  useCheckRefEquality(cancel, 'cancel');

  const submitBurger = async (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.form && e.currentTarget.form.reportValidity()) {
      try {
        e.preventDefault();
        if (!props.ingredients) {
          throw new Error('Empty Ingredients object!!!');
        }
        await props.submitBurgerOrder(
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
