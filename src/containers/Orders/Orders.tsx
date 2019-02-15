import React, { Component, FC, useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../HOCs/withErrorHandler';
import { IOrdersState } from './types';
import { StyledOrders } from './Orders.styles';
import { IformattedOrder } from '../../store/reducers/ordersReducer/types';
import { GetConnectProps } from '../../store/types';
import {
  getFormattedOrders,
  selectOrdersLoading,
  selectOrdersError,
  selectAuthIdToken,
  getOrdersErrorMessage,
  selectAuthUserId,
} from '../../store/selectors/selectors';
import { connect } from 'react-redux';
import { fetchOrders } from '../../store/actions';
import { RouteComponentProps } from 'react-router-dom';
import { IStore } from '../../store/store';

const Orders: FC<IOrdersProps> = props => {
  const getOrders = async () => {
    try {
      await props.fetchOrders(props.token, props.userId);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error('[fetchOrders(Orders)]', error);
    } finally {
      import(/* webpackChunkName: "BurgerBuilder" */ '../BurgerBuilder/BurgerBuilder');
    }
  };

  const generateOrderBlock = (
    customer: IformattedOrder,
    _index: number,
    _array: IformattedOrder[],
  ) => {
    return (
      <div className="OrderWrapper" key={customer.id}>
        <Order {...customer} />
      </div>
    );
  };

  useEffect(() => {
    getOrders();
  }, []);

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
    <StyledOrders>
      <h3>Here Are Your Orders</h3>
      <div className="OrderBox">{allOrders}</div>
    </StyledOrders>
  );
};

const mapOrderStateToProps = (state: IStore) => {
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

const connectOrders = connect(
  mapOrderStateToProps,
  mapOrdersDispatchToProps,
);

export type IOrdersProps = RouteComponentProps & GetConnectProps<typeof connectOrders>;
export default connectOrders(withErrorHandler(Orders, axios));
