import React, { MouseEvent, Component, ChangeEvent, lazy } from 'react';
import { Iingredients } from '../../BurgerBuilder/BurgerBuilder';
import Button from '../../../components/Button/Button';
import { RouteComponentProps } from 'react-router-dom';
import axios from '../../../axios-orders';
import Loader from '../../../components/UI/Loader/Loader';
import Input from './Input/Input';
import { IDbOrder } from '../../Orders/Orders';
import styled from 'styled-components/macro';
// import produce from 'immer';
import { suspenseNode2 } from '../../../HOCs/suspensed';
// import Modal from '../../../components/UI/Modal/Modal';

const immer = import(/* webpackChunkName: "immer" */ 'immer');
const Modal = lazy(() =>
  import(/* webpackChunkName: "Modal", webpackPreload: true */ '../../../components/UI/Modal/Modal'),
);

const SModal = suspenseNode2(Modal);

// tslint:disable-next-line:no-empty-interface
export interface IContactDataProps extends RouteComponentProps {
  ingredients: Iingredients;
  totalPrice: string;
}

export interface IInputConfig {
  value: string;
  type: 'text' | 'email' | 'street-address' | 'country-name' | 'tel' | 'radio';
  placeholder?: string;
  id: string;
  name: string;
  label: string;
  dataSet: 'basicInfo' | 'address' | 'deliveryMethod';
  checked?: boolean;
  defaultChecked?: boolean;
  required?: boolean;
}

// tslint:disable-next-line:no-empty-interface
export interface IContactDataState {
  customer: {
    basicInfo: {
      name: IInputConfig;
      phone: IInputConfig;
      email: IInputConfig;
    };
    address: {
      street: IInputConfig;
      city: IInputConfig;
      state: IInputConfig;
      country: IInputConfig;
    };
    deliveryMethod: {
      deliveryMethod: { value: string };
      options: IInputConfig[];
    };
  };
  loading: boolean;
}
const StyledContactData = styled.div`
  margin: 10px auto;
  text-align: center;
  /* max-width: 80%; */

  form div {
    margin: 4px 0;
  }

  form {
    /* padding: 10px; */
    box-sizing: border-box;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.842);
  }

  @media (min-width: 550px) {
    max-width: 540px;
  }
`;
class ContactData extends Component<IContactDataProps, IContactDataState> {
  constructor(props: IContactDataProps) {
    super(props);

    this.state = {
      customer: {
        basicInfo: {
          name: {
            value: '',
            type: 'text',
            placeholder: 'Your Name',
            id: 'name_id',
            name: 'name',
            label: 'Name:',
            dataSet: 'basicInfo',
            required: true,
          },
          phone: {
            value: '',
            type: 'tel',
            placeholder: 'Your Phone no.',
            id: 'phone_id',
            name: 'phone',
            label: 'Phone no.:',
            dataSet: 'basicInfo',
            required: true,
          },
          email: {
            value: '',
            type: 'email',
            placeholder: 'Your Email',
            id: 'email_id',
            name: 'email',
            label: 'Email:',
            dataSet: 'basicInfo',
            required: true,
          },
        },
        address: {
          street: {
            value: '',
            type: 'street-address',
            placeholder: 'Your Street',
            id: 'street_id',
            name: 'street',
            label: 'Street:',
            dataSet: 'address',
            required: true,
          },
          city: {
            value: '',
            type: 'text',
            placeholder: 'Your City',
            id: 'city_id',
            name: 'city',
            label: 'City:',
            dataSet: 'address',
            required: true,
          },
          state: {
            value: '',
            type: 'text',
            placeholder: 'Your State/Province',
            id: 'state_id',
            name: 'state',
            label: 'State/\nProvince:',
            dataSet: 'address',
            required: true,
          },
          country: {
            value: '',
            type: 'country-name',
            placeholder: 'Your Country',
            id: 'country_id',
            name: 'country',
            label: 'Country:',
            dataSet: 'address',
            required: true,
          },
        },

        deliveryMethod: {
          deliveryMethod: { value: '' },
          options: [
            {
              value: 'cheapest',
              type: 'radio',
              id: 'cheapest_id',
              name: 'deliveryMethod',
              label: 'Cheapest',
              dataSet: 'deliveryMethod',
            },
            {
              value: 'cheap',
              type: 'radio',
              id: 'cheap_id',
              name: 'deliveryMethod',
              label: 'Cheap',
              dataSet: 'deliveryMethod',
            },
            {
              value: 'normal',
              type: 'radio',
              id: 'normal_id',
              name: 'deliveryMethod',
              label: 'Normal',
              defaultChecked: true,
              dataSet: 'deliveryMethod',
            },
            {
              value: 'expensive',
              type: 'radio',
              id: 'expensive_id',
              name: 'deliveryMethod',
              label: 'Expensive',
              dataSet: 'deliveryMethod',
            },
            {
              value: 'very_expensive',
              type: 'radio',
              id: 'very_expensive_id',
              name: 'deliveryMethod',
              label: 'Very Expensive',
              dataSet: 'deliveryMethod',
            },
          ],
        },
      },
      loading: false,
    };
  }

  public render() {
    const { address, deliveryMethod, basicInfo } = this.state.customer;
    const form = this.state.loading ? (
      <Loader />
    ) : (
      <form action="" id="order_form">
        <h3>Enter Your Contact Details to Complete Your Order.</h3>
        {Object.values(basicInfo).map(obj => (
          <Input {...obj} onChange={this.formHandler} key={obj.id} />
        ))}
        <fieldset>
          <legend>Address</legend>
          {Object.values(address).map(obj => (
            <Input {...obj} onChange={this.formHandler} key={obj.id} />
          ))}
        </fieldset>
        <fieldset>
          <legend>Delivery Method</legend>
          {deliveryMethod.options.map(obj => (
            <Input {...obj} onChange={this.formHandler} key={obj.id} />
          ))}
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
      <StyledContactData>
        <SModal show={true} hider={this.cancel} bgColor="white" minWidth={650}>
          {form}
        </SModal>
      </StyledContactData>
    );
  }

  private formHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value = '' } = e.currentTarget;
    const { name } = e.currentTarget;
    const { set = '' } = e.currentTarget.dataset;
    const produce = (await immer).default;
    this.setState(
      produce(draft => {
        if (
          !(draft.customer as any)[set] ||
          !(name in (draft.customer as any)[set])
        ) {
          // tslint:disable-next-line:no-console
          console.error(`${name} not found in ${set}`);
          return;
        }
        (draft.customer as any)[set][name].value = value;
      }),
    );
  };
  private cancel = (e: MouseEvent<Element>) => {
    e.preventDefault();
    this.props.history.goBack();
  };
  private submit = async (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.form && e.currentTarget.form.reportValidity()) {
      try {
        e.preventDefault();
        this.setState({ loading: true });

        const { deliveryMethod, basicInfo, address } = this.state.customer;

        const order: IDbOrder = {
          basicInfo: {
            name: basicInfo.name.value,
            phone: basicInfo.phone.value,
            email: basicInfo.email.value,
          },
          address: {
            street: address.street.value,
            city: address.city.value,
            state: address.state.value,
            country: address.country.value,
          },
          deliveryMethod: deliveryMethod.deliveryMethod.value,
          ingredients: this.props.ingredients,
          price: this.props.totalPrice,
          date: Date(),
        };

        const response = await axios.post('/orders.json', order);
        // tslint:disable-next-line:no-console
        console.log(response);
        //   const orders = this.state.orders.concat(response.data.name);
        //   this.setState({ orders });
        this.setState(
          () => ({ loading: false }),
          () => this.props.history.push('/all-orders'),
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
