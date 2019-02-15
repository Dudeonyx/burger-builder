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

type DeliveryMethods = 'cheapest' | 'cheap' | 'normal' | 'expensive' | 'very_expensive';

const makeForm = {
  name: (initialValue: string = '') => ({
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
  }),
  phone: (initialValue: string = '') => ({
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
  }),
  password: (initialValue: string = '') => ({
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
  }),
  email: (initialValue: string = '') => ({
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
  }),
  street: (initialValue: string = '') => ({
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
  }),
  city: (initialValue: string = '') => ({
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
  }),
  state: (initialValue: string = '') => ({
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
  }),
  country: (initialValue: string = '') => ({
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
  }),
  deliveryMethod: (initialValue: DeliveryMethods = 'normal') => ({
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
  }),
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
export const useDeliveryMethod = (initialValue: DeliveryMethods = 'normal') => {
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

type Fields = Extract<keyof typeof makeForm, string>;

type FormUpdater = (event: ChangeEvent<HTMLInputElement>) => void;

// tslint:disable-next-line: interface-name
interface UseForm {
  <A extends Fields>(...fields: [A | [A, string]]): [Record<A, IInputConfig>, FormUpdater];
  <A extends Fields, B extends Fields>(...fields: [A | [A, string], B | [B, string]]): [
    Record<A | B, IInputConfig>,
    FormUpdater
  ];
  <A extends Fields, B extends Fields, C extends Fields>(
    ...fields: [A | [A, string], B | [B, string], C | [C, string]]
  ): [Record<A | B | C, IInputConfig>, FormUpdater];
  <A extends Fields, B extends Fields, C extends Fields, D extends Fields>(
    ...fields: [A | [A, string], B | [B, string], C | [C, string], D | [D, string]]
  ): [Record<A | B | C | D, IInputConfig>, FormUpdater];
  <A extends Fields, B extends Fields, C extends Fields, D extends Fields, E extends Fields>(
    ...fields: [A | [A, string], B | [B, string], C | [C, string], D | [D, string], E | [E, string]]
  ): [Record<A | B | C | D | E, IInputConfig>, FormUpdater];
  <
    A extends Fields,
    B extends Fields,
    C extends Fields,
    D extends Fields,
    E extends Fields,
    F extends Fields
  >(
    ...fields: [
      A | [A, string],
      B | [B, string],
      C | [C, string],
      D | [D, string],
      E | [E, string],
      F | [F, string]
    ]
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
    ...fields: [
      A | [A, string],
      B | [B, string],
      C | [C, string],
      D | [D, string],
      E | [E, string],
      F | [F, string],
      G | [G, string]
    ]
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
    ...fields: [
      A | [A, string],
      B | [B, string],
      C | [C, string],
      D | [D, string],
      E | [E, string],
      F | [F, string],
      G | [G, string],
      H | [H, string]
    ]
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
    ...fields: [
      A | [A, string],
      B | [B, string],
      C | [C, string],
      D | [D, string],
      E | [E, string],
      F | [F, string],
      G | [G, string],
      H | [H, string],
      I | [I, string]
    ]
  ): [Record<A | B | C | D | E | F | G | H | I, IInputConfig>, FormUpdater];
}

export const useForm: UseForm = (...fields: any[]): any => {
  const [form, setForm,] = useState(() => {
    const state = {};
    fields.forEach(key => {
      if (typeof key === 'string') {
        (state as any)[key] = makeForm[key as keyof typeof makeForm]();
      } else if (Array.isArray(key) && typeof key[0] === 'string') {
        (state as any)[key[0]] = (makeForm as any)[key[0]](key[1]);
      }
    });
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
