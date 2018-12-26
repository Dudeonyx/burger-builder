import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../HOCs/withErrorHandler';
import { IOrdersState } from './types';
import { StyledOrders } from './Orders.styles';
import { IformattedOrder } from '../../store/reducers/ordersReducer/types';
import { GetConnectProps, StoreState } from '../../store/types';
import { createSelector } from 'reselect';
import {
  getFormattedOrders,
  selectOrdersLoading,
  selectOrdersError,
  selectAuthIdToken,
  getOrdersErrorMessage,
} from '../../store/selectors/selectors';
import { connect } from 'react-redux';
import { fetchOrders } from '../../store/reducers/actions';
import { RouteComponentProps } from 'react-router-dom';

class Orders extends Component<IOrdersProps, IOrdersState> {
  public componentDidMount = () => {
    this.fetchOrders();
  };

  private fetchOrders = async () => {
    try {
      await this.props.fetchOrders(this.props.token);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error('[fetchOrders(Orders)]', error);
    } finally {
      import(/* webpackChunkName: "BurgerBuilder" */ '../BurgerBuilder/BurgerBuilder');
    }
  };

  public render() {
    const allOrders = this.props.errorMessage ? (
      <div>
        <p>{this.props.errorMessage}</p>
      </div>
    ) : this.props.loading ? (
      <Loader />
    ) : this.props.formattedOrders.length > 0 ? (
      this.props.formattedOrders.map(this.generateOrderArray)
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
  }

  private generateOrderArray = (
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
}

const mapOrderStateToProps = (state: StoreState) => {
  return {
    formattedOrders: getFormattedOrders(state),
    loading: selectOrdersLoading(state),
    error: selectOrdersError(state),
    errorMessage: getOrdersErrorMessage(state),
    token: selectAuthIdToken(state),
  };
};
const mapOrdersDispatchToProps = { fetchOrders };

const connectOrders = connect(
  mapOrderStateToProps,
  mapOrdersDispatchToProps,
);

export type IOrdersProps = RouteComponentProps &
  GetConnectProps<typeof connectOrders>;
export default connectOrders(withErrorHandler(Orders, axios));
