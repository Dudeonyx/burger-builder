import { lazy, FC, useCallback } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import { connect } from "react-redux";
import { GetConnectProps } from "../../store/types";
import {
  getPurchaseableFromStore,
  selectBurgerOrderSubmitting,
  selectAuthIdToken,
  selectBurgerOrderError,
  selectAuthUserId,
  selectIngredients,
  getTotalPriceFromStore,
  getAuthenticated,
} from "../../store/selectors/selectors";
import { suspenseNode2 } from "../../HOCs/suspensed";
import { setAuthRedirectUrl, submitBurgerOrder } from "../../store/actions";
import { Store } from "../../store/store";
import { useRedux } from "../../shared/CustomHooks";
// import { IngredientsContext, AuthContext } from '../App/App';

const ContactData = lazy(
  () =>
    import(
      /* webpackChunkName: "ContactData", webpackPrefetch: true */ "./ContactData/ContactData"
    )
);

const SContactData = suspenseNode2(ContactData);

const Checkout: FC<ICheckoutProps> = (props) => {
  // const { ingredients, totalPrice } = useContext(IngredientsContext)!;
  // const isAuth = useContext(AuthContext);
  const [{ ingredients, totalPrice, isAuth }] = useRedux((state: Store) => ({
    ingredients: selectIngredients(state),
    totalPrice: getTotalPriceFromStore(state),
    isAuth: getAuthenticated(state),
  }));

  const checkoutCancel = useCallback(() => {
    props.history.push("/");
  }, [props.history]);
  const checkoutContinue = useCallback(() => {
    setTimeout(
      () => import(/* webpackChunkName: "Orders" */ "../Orders/Orders"),
      8000
    );
    props.history.push(props.match.path + "/contact-data");
  }, [props.history, props.match.path]);

  return (
    <div>
      {ingredients && isAuth ? (
        <>
          <Route
            path={props.match.path + "/contact-data"}
            render={(p) =>
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
  mapCheckoutDispatchToProps
);

export type ICheckoutProps = RouteComponentProps &
  GetConnectProps<typeof connectIngredientsState>;

export default connectIngredientsState(Checkout);
