import React, { lazy, FC, useCallback } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
import { GetConnectProps } from '../../store/types';
import {
  selectIngredients,
  getTotalPriceFromStore,
  getPurchaseableFromStore,
  getAuthenticated,
  selectBurgerOrderSubmitting,
  selectAuthIdToken,
  selectBurgerOrderError,
  selectAuthUserId,
} from '../../store/selectors/selectors';
import { suspenseNode2 } from '../../HOCs/suspensed';
import { setAuthRedirectUrl, submitBurgerOrder } from '../../store/actions';
import { IStore } from '../../store/store';

const ContactData = lazy(() =>
  import(/* webpackChunkName: "ContactData", webpackPrefetch: true */ './ContactData/ContactData'),
);

const SContactData = suspenseNode2(ContactData);
const Checkout: FC<ICheckoutProps> = props => {
  const checkoutCancel = useCallback(() => {
    props.history.push('/');
  }, []);
  const checkoutContinue = useCallback(() => {
    setTimeout(() => import(/* webpackChunkName: "Orders" */ '../Orders/Orders'), 8000);
    props.history.push(props.match.path + '/contact-data');
  }, [props.match.path,]);

  return (
    <div>
      {props.ingredients && props.isAuth ? (
        <>
          <Route
            path={props.match.path + '/contact-data'}
            render={p =>
              SContactData({
                ...p,
                ...{
                  totalPrice: props.totalPrice,
                  submitting: props.submitting,
                  ingredients: props.ingredients,
                  token: props.token,
                  error: props.error,
                  userId: props.userId,
                  submitBurgerOrder: props.submitBurgerOrder,
                },
              })
            }
          />
          <CheckoutSummary
            ingredients={props.ingredients}
            totalCost={props.totalPrice}
            checkoutCancel={checkoutCancel}
            checkoutContinue={checkoutContinue}
            purchasable={props.purchaseable}
          />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

const mapCheckoutStateToProps = (state: IStore) => ({
  ingredients: selectIngredients(state),
  totalPrice: getTotalPriceFromStore(state),
  purchaseable: getPurchaseableFromStore(state),
  isAuth: getAuthenticated(state),
  submitting: selectBurgerOrderSubmitting(state),
  token: selectAuthIdToken(state),
  error: selectBurgerOrderError(state),
  userId: selectAuthUserId(state),
});

const mapCheckoutDispatchToProps = { setAuthRedirectUrl, submitBurgerOrder };

const connectIngredientsState = connect(
  mapCheckoutStateToProps,
  mapCheckoutDispatchToProps,
);

export type ICheckoutProps = RouteComponentProps & GetConnectProps<typeof connectIngredientsState>;

export default connectIngredientsState(Checkout);
