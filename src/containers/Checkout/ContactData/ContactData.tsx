import React, { MouseEvent, Component } from 'react';
import { Iingredients } from '../../BurgerBuilder/BurgerBuilder';
import Button from '../../../components/Button/Button';
import { RouteComponentProps } from 'react-router-dom';
import styles from './ContactData.module.css';
import { Modal } from '../../../components/UI/Modal/Modal';
import axios from '../../../axios-orders';
import Loader from '../../../components/UI/Loader/Loader';

// tslint:disable-next-line:no-empty-interface
export interface IContactDataProps extends RouteComponentProps {
  ingredients: Iingredients;
  totalPrice: string;
}

// tslint:disable-next-line:no-empty-interface
export interface IContactDataState {
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
  loading: boolean;
}

class ContactData extends Component<IContactDataProps, IContactDataState> {
  constructor(props: IContactDataProps) {
    super(props);

    this.state = {
      // tslint:disable:object-literal-sort-keys
      customer: {
        name: 'OnyekaChukwu',
        address: {
          street: 'Adjenughure Street',
          city: 'Effural',
          state: 'Selta',
          country: 'Nier'
        },
        phone: '123-255-8416',
        email: 'test@testing.on'
      },
      deliveryMethod: 'cheapest',
      loading: false
      // tslint:enable:object-literal-sort-keys
    };
  }
  public componentDidMount = () => {
    //   const form = document.getElementById('#orderform');
    // if (!form) { return; }
    // form.addEventListener('submit', this.submit);
  };

  public render() {
    const form = this.state.loading ? (
      <Loader />
    ) : (
      <form action="" id="order_form">
        <h3>Enter Your Contact Details to Complete Your Order.</h3>

        <div>
          <label htmlFor="name_id">Name:</label>
          <input
            id="name_id"
            type="text"
            name="name"
            placeholder="Name"
            required={true}
          />
        </div>
        <fieldset>
          <legend>Address</legend>
          <div>
            <label htmlFor="street_id">Street: </label>
            <input
              id="street_id"
              type="street-address"
              name="street"
              placeholder="Street"
            />
          </div>
          <div>
            <label htmlFor="city_id">City: </label>
            <input id="city_id" type="text" name="city" placeholder="City" />
          </div>
          <div>
            <label htmlFor="state_id">State: </label>
            <input id="state_id" type="text" name="state" placeholder="State" />
          </div>
          <div>
            <label htmlFor="country_id">Country: </label>
            <input
              id="country_id"
              type="country-name"
              name="country"
              placeholder="Country"
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Contact</legend>
          <div>
            <label htmlFor="phone_id">Phone No.: </label>
            <input id="phone_id" type="tel" name="phone" placeholder="Phone" />
          </div>
          <div>
            <label htmlFor="email_id">Email: </label>
            <input
              id="email_id"
              type="email"
              name="email"
              placeholder="Email Address"
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Delivery Method</legend>
          <div>
            <input
              id="cheapest_id"
              type="radio"
              name="delivery_method"
              value="cheapest"
            />
            <label htmlFor="cheapest_id">Cheapest</label>
          </div>
          <div>
            <input
              id="cheap_id"
              type="radio"
              name="delivery_method"
              value="cheap"
            />
            <label htmlFor="cheap_id">Cheap</label>
          </div>
          <div>
            <input
              id="expensive_id"
              type="radio"
              name="delivery_method"
              value="expensive"
              defaultChecked={true}
            />
            <label htmlFor="expensive_id">Expensive</label>
          </div>
          <div>
            <input
              id="very-expensive_id"
              type="radio"
              name="delivery_method"
              value="very expensive"
            />
            <label htmlFor="very-expensive_id">Very Expensive</label>
          </div>
        </fieldset>

        <div>
          <Button
            type="reset"
            children="CANCEL"
            onClick={this.cancel}
            btnType="Danger"
          />
          <Button
            type="submit"
            children="ORDER"
            onClick={this.submit}
            btnType="Success"
          />
        </div>
      </form>
    );
    return (
      <div className={styles.ContactData}>
        <Modal show={true} hider={this.cancel}>
          {form}
        </Modal>
      </div>
    );
  }
  private cancel = (e: MouseEvent<Element>) => {
    e.preventDefault();
    this.props.history.goBack();
  };
  private submit = async (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.form && e.currentTarget.form.reportValidity()) {
      try {
        e.preventDefault();
        this.setState({ loading: true });
        const {
          name: { value: name },
          delivery_method: { value: deliveryMethod }
        } = e.currentTarget.form as any;
        // tslint:disable-next-line:no-console
        console.log(name, deliveryMethod);
        const customer = { ...this.state.customer, name };
        const { loading, ...order } = {
          ...this.state,
          customer,
          deliveryMethod,
          ingredients: this.props.ingredients,
          price: this.props.totalPrice,
          date: Date()
        };
        const response = await axios.post('/orders.json', order);
        // tslint:disable-next-line:no-console
        console.log(response);
        //   const orders = this.state.orders.concat(response.data.name);
        //   this.setState({ orders });
        this.setState(
          () => ({ loading: false }),
          () => this.props.history.push('/all-orders')
        );
      } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
        this.setState({ loading: false });
      }
    }
  };
}

export default ContactData;
