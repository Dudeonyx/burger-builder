import React, { FunctionComponent, Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Iingredients } from '../BurgerBuilder';
import Order from '../../components/Order';
import axios from '../../axios-orders';
import Loader from '../../components/UI/Loader';
import withErrorHandler from '../../HOCs/withErrorHandler';
import styled from 'styled-components';
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

const StyledOrders = styled.div`
  & {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 10px 0;
  }
  .OrderBox {
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.658);
    margin: 15px;
    border-radius: 20px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    min-height: 65vh;
  }
  .OrderWrapper {
    flex: 0.3 0.2 100%;
  }

  @media (min-width: 650px) {
    .OrderBox {
      max-width: 600px;
    }
  }
`;
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
        <div className="OrderWrapper" key={customer.id}>
          <Order {...customer} />
        </div>
      ))
    ) : null;

    return (
      <StyledOrders>
        <h3>Here Are Your Orders</h3>
        <div className="OrderBox">{allOrders}</div>
      </StyledOrders>
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
