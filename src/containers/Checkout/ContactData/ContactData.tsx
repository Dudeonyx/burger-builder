import styled from '@emotion/styled/macro';
// import styled from 'styled-components/macro';
import React, { MouseEvent, Component } from 'react';
import Button from '../../../components/Button/Button';
import axios from '../../../axios-orders';
import Loader from '../../../components/UI/Loader/Loader';
import Input from './Input/Input';
import { IDbOrder } from '../../Orders/types';
import Modal from '../../../components/UI/Modal/Modal';
import { IContactDataState } from './types';
import {
  mapContactDataStateToProps,
  mapContactDataDispatchToProps,
} from '../../../store/reducers/actions';
import { connect } from 'react-redux';
import { GetConnectProps } from '../../../store/types';
import { RouteComponentProps } from 'react-router';
const StyledContactData = styled.div`
  margin: 10px auto;
  text-align: center;

  form div {
    margin: 4px 0;
  }

  form {
    box-sizing: border-box;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.842);
  }

  @media (min-width: 550px) {
    max-width: 540px;
  }
`;

export type IContactDataProps = RouteComponentProps & TConnectContactDataProps;
class ContactData extends Component<IContactDataProps, IContactDataState> {
  public state: IContactDataState = {
    loading: false,
  };
  public render() {
    const { address, deliveryMethod, basicInfo } = this.props.customer;
    const form = this.state.loading ? (
      <Loader />
    ) : (
      <form id="order_form">
        <h3>Enter Your Contact Details to Complete Your Order.</h3>
        {Object.values(basicInfo).map(obj => (
          <Input
            {...obj}
            onChange={this.props.updateContactDataForm}
            key={obj.id}
          />
        ))}
        <fieldset>
          <legend>Address</legend>
          {Object.values(address).map(obj => (
            <Input
              {...obj}
              onChange={this.props.updateContactDataForm}
              key={obj.id}
            />
          ))}
        </fieldset>
        <fieldset>
          <legend>Delivery Method</legend>
          {deliveryMethod.deliveryMethod.options.map(obj => (
            <Input
              {...obj}
              onChange={this.props.updateContactDataForm}
              key={obj.id}
            />
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
        <Modal show={true} hider={this.cancel} bgColor="white" minWidth={650}>
          {form}
        </Modal>
      </StyledContactData>
    );
  }

  private cancel = (e: MouseEvent<Element>) => {
    e.preventDefault();
    this.props.resetContactDataForm();
    this.props.history.goBack();
  };
  private submit = async (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.form && e.currentTarget.form.reportValidity()) {
      try {
        e.preventDefault();
        this.setState({ loading: true });
        const { deliveryMethod, basicInfo, address } = this.props.customer;

        const test0: IDbOrder = {
          ...Object.entries(this.props.customer).reduce(
            (cObj, [cKey, cConfig,]) => {
              if (cKey === 'deliveryMethod' && cKey in cConfig) {
                (cObj as any).deliveryMethod = (cConfig as any)[cKey].value;
                return cObj;
              }
              (cObj as any)[cKey] = Object.entries(cConfig).reduce(
                (obj, [key, config,]) => {
                  (obj as any)[key] = config.value;
                  return obj;
                },
                {} as IDbOrder['basicInfo' | 'address' | 'deliveryMethod'],
              );
              return cObj;
            },
            {} as IDbOrder,
          ),
          ingredients: this.props.ingredients!,
          price: this.props.totalPrice,
          date: Date(),
        };
        // tslint:disable-next-line: no-console
        console.log('[Test Form object]', test0);

        // const test = Object.entries(basicInfo).reduce(
        //   (obj, [key, config,]) => {
        //     (obj as any)[key] = config.value;
        //     return obj;
        //   },
        //   {} as IDbOrder['basicInfo'],
        // );
        // const test2 = Object.entries(address).reduce(
        //   (obj, [key, config,]) => {
        //     (obj as any)[key] = config.value;
        //     return obj;
        //   },
        //   {} as IDbOrder['address'],
        // );
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
          ingredients: this.props.ingredients!,
          price: this.props.totalPrice,
          date: Date(),
        };

        await axios.post('/orders.json', order);
        this.props.resetContactDataForm();
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

const connectContactData = connect(
  mapContactDataStateToProps,
  mapContactDataDispatchToProps,
);
export type TConnectContactDataProps = GetConnectProps<
  typeof connectContactData
>;

export default connectContactData(ContactData);
