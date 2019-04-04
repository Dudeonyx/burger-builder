import React, { lazy, FC, useCallback, useContext } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
import { GetConnectProps } from '../../store/types';
import {
  getPurchaseableFromStore,
  selectBurgerOrderSubmitting,
  selectAuthIdToken,
  selectBurgerOrderError,
  selectAuthUserId,
} from '../../store/selectors/selectors';
import { suspenseNode2 } from '../../HOCs/suspensed';
import { setAuthRedirectUrl, submitBurgerOrder } from '../../store/actions';
import { Store } from '../../store/store';
import { IngredientsContext, AuthContext } from '../App/App';

const ContactData = lazy(() =>
  import(/* webpackChunkName: "ContactData", webpackPrefetch: true */ './ContactData/ContactData'),
);

const SContactData = suspenseNode2(ContactData);

const Checkout: FC<ICheckoutProps> = props => {
  const { ingredients, totalPrice } = useContext(IngredientsContext)!;
  const isAuth = useContext(AuthContext);

  const checkoutCancel = useCallback(() => {
    props.history.push('/');
  }, []);
  const checkoutContinue = useCallback(() => {
    setTimeout(() => import(/* webpackChunkName: "Orders" */ '../Orders/Orders'), 8000);
    props.history.push(props.match.path + '/contact-data');
  }, [props.match.path]);

  return (
    <div>
      {ingredients && isAuth ? (
        <>
          <Route
            path={props.match.path + '/contact-data'}
            render={p =>
              SContactData({
                ...p,
                ...{
                  totalPrice,
                  submitting: props.submitting,
                  ingredients,
                  token: props.token,
                  error: props.error,
                  userId: props.userId,
                  submitBurgerOrder: props.submitBurgerOrder,
                },
              })
            }
          />
          <CheckoutSummary
            ingredients={ingredients}
            totalCost={totalPrice}
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

const mapCheckoutStateToProps = (state: Store) => ({
  purchaseable: getPurchaseableFromStore(state),
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
