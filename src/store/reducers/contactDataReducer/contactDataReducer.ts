import produce from 'immer';
import { IContactDataReducerState, IcontactDataReducerAction } from './types';
import { contactDataReducerActionTypes } from '../actions/actionTypes';
const initialState: IContactDataReducerState = {
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
      deliveryMethod: {
        value: '',
        options: [
          {
            value: 'cheapest',
            type: 'radio',
            id: 'cheapest_id',
            name: 'deliveryMethod',
            label: 'Cheapest',
            dataSet: 'deliveryMethod',
            checked: false,
          },
          {
            value: 'cheap',
            type: 'radio',
            id: 'cheap_id',
            name: 'deliveryMethod',
            label: 'Cheap',
            dataSet: 'deliveryMethod',
            checked: false,
          },
          {
            value: 'normal',
            type: 'radio',
            id: 'normal_id',
            name: 'deliveryMethod',
            label: 'Normal',
            dataSet: 'deliveryMethod',
            checked: true,
          },
          {
            value: 'expensive',
            type: 'radio',
            id: 'expensive_id',
            name: 'deliveryMethod',
            label: 'Expensive',
            dataSet: 'deliveryMethod',
            checked: false,
          },
          {
            value: 'very_expensive',
            type: 'radio',
            id: 'very_expensive_id',
            name: 'deliveryMethod',
            label: 'Very Expensive',
            dataSet: 'deliveryMethod',
            checked: false,
          },
        ],
      },
    },
  },
};

export const contactDataReducer = (
  state = initialState,
  action: IcontactDataReducerAction,
) =>
  produce(state, draft => {
    switch (action.type) {
      case contactDataReducerActionTypes.UPDATE_CONTACT_FORM:
        const { set, name, value } = action.payload;
        if (!(set in draft.customer)) {
          // tslint:disable-next-line:no-console
          console.error(`${set} not found in Form.customer`);
          break;
        }
        if (!(name in draft.customer[set])) {
          // tslint:disable-next-line:no-console
          console.error(`${name} not found in ${set}`);
          break;
        }
        (draft.customer as any)[set][name].value = value;
        if (name === 'deliveryMethod') {
          draft.customer.deliveryMethod.deliveryMethod.options.map(obj => {
            obj.value === value ? (obj.checked = true) : (obj.checked = false);
          });
        }
        break;
      case contactDataReducerActionTypes.RESET_CONTACT_FORM:
        draft.customer = initialState.customer;
        break;
      default:
        break;
    }
  });
