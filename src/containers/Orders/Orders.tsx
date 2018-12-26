import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../HOCs/withErrorHandler';
import { IOrdersState } from './types';
import { StyledOrders } from './Orders.styles';
import { IformattedOrder } from '../../store/reducers/ordersReducer/types';
import { GetConnectProps } from '../../store/types';
import { createSelector } from 'reselect';
import {
  selectformattedOrders,
  selectOrdersLoading,
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
      await this.props.fetchOrders();
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);
    } finally {
      import(/* webpackChunkName: "BurgerBuilder" */ '../BurgerBuilder/BurgerBuilder');
    }
  };

  public render() {
    const allOrders = this.props.loading ? (
      <Loader />
    ) : this.props.formattedOrders.length > 0 ? (
      this.props.formattedOrders.map(this.generateOrderArray)
    ) : null;

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

const getOrdersState = createSelector(
  [selectformattedOrders, selectOrdersLoading,],
  (formattedOrders, loading) => {
    return {
      formattedOrders,
      loading,
    };
  },
);

const mapOrdersDispatchToProps = { fetchOrders };

const connectOrders = connect(
  getOrdersState,
  mapOrdersDispatchToProps,
);

export type IOrdersProps = RouteComponentProps &
  GetConnectProps<typeof connectOrders>;
export default connectOrders(withErrorHandler(Orders, axios));
