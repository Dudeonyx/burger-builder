import {
  useState,
  useReducer,
  useCallback,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from 'react';
import { IInputConfig } from '../components/UI/Input/types';
import { updateFormImmutably } from '../components/UI/Input';

const fullForm = {
  name: {
    value: '',
    type: 'text',
    placeholder: 'Your Name',
    id: 'Auth_name_id',
    name: 'name',
    label: 'Name:',
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
  password: {
    value: '',
    type: 'password',
    placeholder: 'Password',
    id: 'Auth_word_id',
    name: 'password',
    label: 'Password:',
    validation: {
      required: true,
      valid: false,
      touched: false,
      minLength: 6,
    },
  },
  email: {
    value: '',
    type: 'email',
    placeholder: 'Your Email',
    id: 'Auth_email_id',
    name: 'email',
    label: 'Email:',
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
      },
      {
        value: 'cheap',
        id: 'cheap_id',
        label: 'Cheap',
      },
      {
        value: 'normal',
        id: 'normal_id',
        label: 'Normal',
      },
      {
        value: 'expensive',
        id: 'expensive_id',
        label: 'Expensive',
      },
      {
        value: 'very_expensive',
        id: 'very_expensive_id',
        label: 'Very Expensive',
      },
    ],
  },
};

export const useName = (initialValue: string = '') => {
  const name = useState<IInputConfig>({
    value: initialValue,
    type: 'text',
    placeholder: 'Your Name',
    id: 'Auth_name_id',
    name: 'name',
    label: 'Name:',
    validation: {
      required: true,
      valid: false,
      touched: false,
      minLength: 5,
    },
  });
  return name;
};
export const usePassword = (initialValue: string = '') => {
  const password = useState<IInputConfig>({
    value: initialValue,
    type: 'password',
    placeholder: 'Password',
    id: 'Auth_word_id',
    name: 'password',
    label: 'Password:',
    validation: {
      required: true,
      valid: false,
      touched: false,
      minLength: 6,
    },
  });
  return password;
};
export const useEmail = (initialValue: string = '') => {
  const email = useState<IInputConfig>({
    value: initialValue,
    type: 'email',
    placeholder: 'Your Email',
    id: 'Auth_email_id',
    name: 'email',
    label: 'Email:',
    validation: {
      required: true,
      valid: false,
      touched: false,
      minLength: 5,
      isEmail: true,
    },
  });
  return email;
};

export const usePhone = (initialValue: string = '') => {
  const Phone = useState<IInputConfig>({
    value: initialValue,
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
  });

  return Phone;
};
export const useStreet = (initialValue: string = '') => {
  const street = useState<IInputConfig>({
    value: initialValue,
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
  });

  return street;
};
export const useCity = (initialValue: string = '') => {
  const city = useState<IInputConfig>({
    value: initialValue,
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
  });

  return city;
};
export const useProvince = (initialValue: string = '') => {
  const province = useState<IInputConfig>({
    value: initialValue,
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
  });

  return province;
};
export const useCountry = (initialValue: string = '') => {
  const country = useState<IInputConfig>({
    value: initialValue,
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
  });

  return country;
};
export const useDeliveryMethod = (
  initialValue: 'cheapest' | 'cheap' | 'normal' | 'expensive' | 'very_expensive' = 'normal',
) => {
  const deliveryMethod = useState<IInputConfig>({
    id: 'customer_deliveryMethod_id',
    label: '',
    value: initialValue,
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
      },
      {
        value: 'cheap',
        id: 'cheap_id',
        label: 'Cheap',
      },
      {
        value: 'normal',
        id: 'normal_id',
        label: 'Normal',
      },
      {
        value: 'expensive',
        id: 'expensive_id',
        label: 'Expensive',
      },
      {
        value: 'very_expensive',
        id: 'very_expensive_id',
        label: 'Very Expensive',
      },
    ],
  });

  return deliveryMethod;
};

const fullForm2 = {
  name: useName,
  email: useEmail,
  password: usePassword,
  phone: usePhone,
  street: useStreet,
  city: useCity,
  state: useProvince,
  country: useCountry,
  deliveryMethod: useDeliveryMethod,
};

type Fields = Extract<keyof typeof fullForm, string>;

type FormUpdater = (event: ChangeEvent<HTMLInputElement>) => void;

// tslint:disable-next-line: interface-name
interface UseForm {
  <A extends Fields>(...fields: [A]): [Record<A, IInputConfig>, FormUpdater];
  <A extends Fields, B extends Fields>(...fields: [A, B]): [
    Record<A | B, IInputConfig>,
    FormUpdater
  ];
  <A extends Fields, B extends Fields, C extends Fields>(...fields: [A, B, C]): [
    Record<A | B | C, IInputConfig>,
    FormUpdater
  ];
  <A extends Fields, B extends Fields, C extends Fields, D extends Fields>(
    ...fields: [A, B, C, D]
  ): [Record<A | B | C | D, IInputConfig>, FormUpdater];
  <A extends Fields, B extends Fields, C extends Fields, D extends Fields, E extends Fields>(
    ...fields: [A, B, C, D, E]
  ): [Record<A | B | C | D | E, IInputConfig>, FormUpdater];
  <
    A extends Fields,
    B extends Fields,
    C extends Fields,
    D extends Fields,
    E extends Fields,
    F extends Fields
  >(
    ...fields: [A, B, C, D, E, F]
  ): [Record<A | B | C | D | E | F, IInputConfig>, FormUpdater];
  <
    A extends Fields,
    B extends Fields,
    C extends Fields,
    D extends Fields,
    E extends Fields,
    F extends Fields,
    G extends Fields
  >(
    ...fields: [A, B, C, D, E, F, G]
  ): [Record<A | B | C | D | E | F | G, IInputConfig>, FormUpdater];
  <
    A extends Fields,
    B extends Fields,
    C extends Fields,
    D extends Fields,
    E extends Fields,
    F extends Fields,
    G extends Fields,
    H extends Fields
  >(
    ...fields: [A, B, C, D, E, F, G, H]
  ): [Record<A | B | C | D | E | F | G | H, IInputConfig>, FormUpdater];
  <
    A extends Fields,
    B extends Fields,
    C extends Fields,
    D extends Fields,
    E extends Fields,
    F extends Fields,
    G extends Fields,
    H extends Fields,
    I extends Fields
  >(
    ...fields: [A, B, C, D, E, F, G, H, I]
  ): [Record<A | B | C | D | E | F | G | H | I, IInputConfig>, FormUpdater];
}

export const useForm: UseForm = (...fields: any[]): any => {
  const [form, setForm,] = useState(() => {
    const state = {};
    fields.forEach(key => ((state as any)[key] = (fullForm as any)[key]));
    return state;
  });
  const updateForm: FormUpdater = useCallback(
    ({ currentTarget: { name: field, value } }: ChangeEvent<HTMLInputElement>) => {
      setForm((oldForm: any) => updateFormImmutably(oldForm, field, value));
    },
    [],
  );
  return [form, updateForm,];
};

export function usePrevious<V>(value: V) {
  const prev = useRef<V | null>(null);
  useEffect(() => {
    prev.current = value;
  });
  return prev.current;
}
