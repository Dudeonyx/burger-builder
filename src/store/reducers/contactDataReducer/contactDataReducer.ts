import produce from 'immer';
import { IContactDataReducerState, IContactDataReducerActions } from './types';
import { actionTypes } from '../actions';
import { updateform, generateOrder } from './utilities';
import { IDbOrder } from '../ordersReducer/types';
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
        value: 'normal',
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
  presubmitOrder: null,
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
      case actionTypes.UPDATE_CONTACT_FORM:
        updateform(draft, action);
        break;
      case actionTypes.ORDER_SUCCESSFUL:
        draft.orders[action.payload.name] = action.payload.order;
        draft.submitting = false;
        break;
      case actionTypes.ORDER_FAILED:
        draft.error = action.payload.error;
        draft.submitting = false;
        break;
      case actionTypes.SET_ORDER_SUBMITTING:
        draft.submitting = true;
        break;
      case actionTypes.RESET_CONTACT_FORM:
        draft.submitting = false;
        draft.customer = initialState.customer;
        break;
      case actionTypes.GENERATE_PRESUBMIT_ORDER:
        const order: IDbOrder = generateOrder(draft, action);
        draft.presubmitOrder = order;
        break;
      default:
        break;
    }
  });
};
