import { FC, useEffect } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Loader from "../../components/UI/Loader/Loader";
import { StyledOrders } from "./Orders.styles";
import { IformattedOrder as FormattedOrder } from "../../store/reducers/ordersReducer/types";
import { GetConnectProps } from "../../store/types";
import {
  getFormattedOrders,
  selectOrdersLoading,
  selectOrdersError,
  selectAuthIdToken,
  getOrdersErrorMessage,
  selectAuthUserId,
} from "../../store/selectors/selectors";
import { connect } from "react-redux";
import { fetchOrders } from "../../store/actions";
import { RouteComponentProps } from "react-router-dom";
import { Store } from "../../store/store";
import SwipeableListItem from "../../components/Swipe-list/SwipeableListItem";
import { useAxiosErrorHandler } from "../../shared/CustomHooks";

const func = () => void 0;
const generateOrderBlock = (
  customer: FormattedOrder,
  _index: number,
  _array: FormattedOrder[]
) => {
  return (
    <div className="OrderWrapper" key={customer.id}>
      <SwipeableListItem onSwipe={func}>
        <Order {...customer} />
      </SwipeableListItem>
    </div>
  );
};
const Orders: FC<OrdersProps> = (props) => {
  const axiosError = useAxiosErrorHandler(axios);
  useEffect(() => {
    (async () => {
      try {
        await props.fetchOrders(props.token, props.userId);
      } catch (error) {
        // tslint:disable-next-line:no-console
        console.error("[fetchOrders(Orders)]", error);
      } finally {
        import(
          /* webpackChunkName: "BurgerBuilder" */ "../BurgerBuilder/BurgerBuilder"
        );
      }
    })();
  }, [props.fetchOrders, props.token, props.userId]); // eslint-disable-line

  const allOrders = props.errorMessage ? (
    <div>
      <p>{props.errorMessage}</p>
    </div>
  ) : props.loading ? (
    <Loader />
  ) : props.formattedOrders.length > 0 ? (
    props.formattedOrders.map(generateOrderBlock)
  ) : (
    <div>
      <p>Your order history is blank.</p>
    </div>
  );

  return (
    <>
      {axiosError}
      <StyledOrders>
        <h3>Here Are Your Orders</h3>
        <div className="OrderBox">{allOrders}</div>
      </StyledOrders>
    </>
  );
};

const mapOrderStateToProps = (state: Store) => {
  return {
    formattedOrders: getFormattedOrders(state),
    loading: selectOrdersLoading(state),
    error: selectOrdersError(state),
    errorMessage: getOrdersErrorMessage(state),
    token: selectAuthIdToken(state),
    userId: selectAuthUserId(state),
  };
};
const mapOrdersDispatchToProps = { fetchOrders };

const connectOrders = connect(mapOrderStateToProps, mapOrdersDispatchToProps);

export type OrdersProps = RouteComponentProps &
  GetConnectProps<typeof connectOrders>;
export default connectOrders(Orders);
