import produce from 'immer';
import { IContactDataReducerState, IContactDataReducerActions } from './types';
import { actionTypes } from '../actions';
import { updateform, generateOrder } from './utilities';
import { IDbOrder } from '../ordersReducer/types';
import { assertIsNever } from '../sharedUtilities';
const initialState: IContactDataReducerState = {
  customer: {
    name: {
      value: '',
      type: 'text',
      placeholder: 'Your Name',
      id: 'customer_name_id',
      name: 'name',
      label: 'Name:',
      dataSet: 'basicInfo',
      validation: {
        required: true,
        valid: false,
        touched: false,
        minLength: 5,
      },
    },
    phone: {
      value: '',
      type: 'tel',
      placeholder: 'Your Phone no.',
      id: 'customer_phone_id',
      name: 'phone',
      label: 'Phone no.:',
      dataSet: 'basicInfo',
      validation: {
        required: true,
        valid: false,
        touched: false,
        minLength: 5,
        isNumeric: true,
      },
    },
    email: {
      value: '',
      type: 'email',
      placeholder: 'Your Email',
      id: 'customer_email_id',
      name: 'email',
      label: 'Email:',
      dataSet: 'basicInfo',
      validation: {
        required: true,
        valid: false,
        touched: false,
        minLength: 5,
        isEmail: true,
      },
    },
    street: {
      value: '',
      type: 'street-address',
      placeholder: 'Your Street',
      id: 'customer_street_id',
      name: 'street',
      label: 'Street:',
      dataSet: 'address',
      validation: {
        required: true,
        valid: false,
        touched: false,
        minLength: 3,
      },
    },
    city: {
      value: '',
      type: 'text',
      placeholder: 'Your City',
      id: 'customer_city_id',
      name: 'city',
      label: 'City:',
      dataSet: 'address',
      validation: {
        required: true,
        valid: false,
        touched: false,
        minLength: 3,
      },
    },
    state: {
      value: '',
      type: 'text',
      placeholder: 'Your State/Province',
      id: 'customer_state_id',
      name: 'state',
      label: 'State/\nProvince:',
      dataSet: 'address',
      validation: {
        required: true,
        valid: false,
        touched: false,
        minLength: 3,
      },
    },
    country: {
      value: '',
      type: 'country-name',
      placeholder: 'Your Country',
      id: 'customer_country_id',
      name: 'country',
      label: 'Country:',
      dataSet: 'address',
      validation: {
        required: true,
        valid: false,
        touched: false,
        minLength: 3,
      },
    },

    deliveryMethod: {
      id: 'customer_deliveryMethod_id',
      label: '',
      value: 'normal',
      type: 'select',
      name: 'deliveryMethod',
      dataSet: 'deliveryMethod',
      validation: {
        required: true,
        valid: true,
        touched: true,
      },
      options: [
        {
          value: 'cheapest',
          id: 'cheapest_id',
          label: 'Cheapest',
          checked: false,
        },
        {
          value: 'cheap',
          id: 'cheap_id',
          label: 'Cheap',
          checked: false,
        },
        {
          value: 'normal',
          id: 'normal_id',
          label: 'Normal',
          checked: true,
        },
        {
          value: 'expensive',
          id: 'expensive_id',
          label: 'Expensive',
          checked: false,
        },
        {
          value: 'very_expensive',
          id: 'very_expensive_id',
          label: 'Very Expensive',
          checked: false,
        },
      ],
    },
  },
  presubmitOrder: null,
  orders: {},
  error: false,
  submitting: false,
};

export const contactDataReducer = produce(
  (draft, action: IContactDataReducerActions) => {
    switch (action.type) {
      case actionTypes.UPDATE_CONTACT_FORM:
        updateform(draft, action);
        break;
      case actionTypes.GENERATE_PRESUBMIT_ORDER:
        const order: IDbOrder = generateOrder(draft, action);
        draft.presubmitOrder = order;
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
      default:
        assertIsNever(action);
        break;
    }
  },
  initialState,
);
