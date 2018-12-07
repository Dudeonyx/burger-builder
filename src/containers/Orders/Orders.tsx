import React, { FunctionComponent, Component } from 'react';
import styles from './Orders.module.css';
import { RouteComponentProps } from 'react-router-dom';
import { Iingredients } from '../BurgerBuilder';
import { IingredientsKeys } from '../../components/Burger/BuildControls';
import Order from '../../components/Order';
import axios from '../../axios-orders';
import Loader from '../../components/UI/Loader';
import withErrorHandler from '../../HOCs/withErrorHandler';
// tslint:disable-next-line:no-empty-interface
export interface IOrdersProps extends RouteComponentProps {}

export interface IDbOrder {
  customer: {
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
    };
    phone: string;
    email: string;
  };
  deliveryMethod: string;
  ingredients: Iingredients;
  date: string;
  price: string;
}
export interface IDbOrders {
  [x: string]: IDbOrder;
}
export interface IformattedOrder {
  id: string;
  ingredients: Iingredients;
  name: string;
  totalPrice: string;
}
export interface IOrdersState {
  orders: IDbOrders | null;
  loading: boolean;
  formattedOrders: IformattedOrder[];
}
class Orders extends Component<IOrdersProps, IOrdersState> {
  constructor(props: IOrdersProps) {
    super(props);
    this.state = {
      orders: null,
      loading: false,
      formattedOrders: []
    };
  }

  public componentDidMount = () => {
    this.fetchOrders();
  };

  private fetchOrders = async () => {
    try {
      type T = string;
      this.setState({ loading: true });
      const response = await axios.get<IDbOrders>('/orders.json');
      const { data } = response;

      const formattedOrders: IformattedOrder[] = (Object.entries(data) as Array<
        [T, IDbOrders[T]]
      >)
        .reverse()
        .slice()
        .map(
          ([
            id,
            {
              customer: { name },
              ingredients,
              price: totalPrice
            }
          ]) => ({ id, name, ingredients, totalPrice })
        );

      this.setState({ orders: data, formattedOrders, loading: false });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);
      this.setState({ loading: false });
    }
  };

  public render() {
    const allOrders = this.state.loading ? (
      <Loader />
    ) : this.state.formattedOrders.length > 0 ? (
      this.state.formattedOrders.map(customer => (
        <Order {...customer} key={customer.id} className={styles.Order} />
      ))
    ) : null;

    return (
      <div className={styles.Orders}>
        <h3>Here Are Your Orders</h3>
        <div className={styles.OrderBox}>{allOrders}</div>
      </div>
    );
  }
}

// Orders.propTypes = {
//   // bla: PropTypes.string,
// };

// Orders.defaultProps = {
//   // bla: 'test',
// };

export default withErrorHandler(Orders, axios);
