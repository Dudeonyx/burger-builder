import produce from 'immer';
import { IContactDataReducerState, IContactDataReducerActions } from './types';
import { ActionTypes } from '../actions';
import { updateform } from './utilities';
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
  orders: {},
  error: false,
  submitting: false,
};

export const contactDataReducer = (
  state = initialState,
  action: IContactDataReducerActions,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.UPDATE_CONTACT_FORM:
        updateform(draft, action);
        break;
      case ActionTypes.ORDER_SUCCESSFUL:
        draft.orders[action.payload.name] = action.payload.order;
        break;
      case ActionTypes.ORDER_FAILED:
        draft.error = action.payload.error;
        break;
      case ActionTypes.SET_SUBMITTING:
        draft.submitting = action.payload.submitting;
        break;
      case ActionTypes.RESET_CONTACT_FORM:
        draft.customer = initialState.customer;
        break;
      default:
        break;
    }
  });
};
