import {
  useState,
  useCallback,
  ChangeEvent,
  useRef,
  useEffect,
  MouseEvent as ReactMouseEvent,
  ComponentType,
  // useLayoutEffect,
} from 'react';
import { IInputConfig } from '../components/UI/Input/types';
import { updateFormImmutably } from '../components/UI/Input';
// import ReactIf from '../components/R_IF/R_IF';

// export const useConditional = <
//   If extends ComponentType,
//   Else extends ComponentType,
//   ElseIf extends ComponentType
// >({
//   conditonal,
//   if: rIf,
//   else: rElse = null,
//   elseif: rElseIf = null,
// }: {
//   if: If;
//   else: Else | null;
//   elseIf: {conditional: boolean, component:ElseIf} | null;
//   conditional: boolean;
// }) => {

// };

export const useConditional2 = <P extends {}>(Component: ComponentType<P>) => {
  const Check = useCallback(({ 'r-if': rIF, ...props }: P & { 'r-if': boolean }) => {
    return rIF ? <Component {...(props as unknown) as P} /> : null;
  }, []);

  return Check;
};

export function usePrevious<V>(value: V) {
  const prev = useRef<V | null>(null);
  useEffect(() => {
    prev.current = value;
  });
  return prev.current;
}
export const useForceUpdate = () => {
  const [state, setState] = useState(false);

  const forceUpdate = useCallback(() => {
    setState(prev => !prev);
  }, [setState]);
  return [state, forceUpdate] as [typeof state, typeof forceUpdate];
};

const fixedArray: never[] = [];

// type MouseEventEnum = MouseEvent | ReactMouseEvent;

type EventHandler = <MouseEventEnum extends MouseEvent | ReactMouseEvent>(
  evt: MouseEventEnum,
) => void;
interface UseMakeLamda {
  <K extends string | number, MouseEventEnum extends MouseEvent | ReactMouseEvent>(
    callbackArg: (evt: MouseEventEnum, key: K) => void,
    callbackDependencies?: any[],
  ): [(key: K) => EventHandler, () => void];
  <K extends string | number, MouseEventEnum extends MouseEvent | ReactMouseEvent, A0>(
    callbackArg: (evt: MouseEventEnum, key: K, arg0: A0) => void,
    callbackDependencies?: any[],
  ): [(key: K, arg0: A0) => EventHandler, () => void];
  <K extends string | number, MouseEventEnum extends MouseEvent | ReactMouseEvent, A0, A1>(
    callbackArg: (evt: MouseEventEnum, key: K, arg0: A0, arg1: A1) => void,
    callbackDependencies?: any[],
  ): [(key: K, arg0: A0, arg1: A1) => EventHandler, () => void];
  <K extends string | number, MouseEventEnum extends MouseEvent | ReactMouseEvent, A0, A1, A2>(
    callbackArg: (evt: MouseEventEnum, key: K, arg0: A0, arg1: A1, arg2: A2) => void,
    callbackDependencies?: any[],
  ): [(key: K, arg0: A0, arg1: A1, arg2: A2) => EventHandler, () => void];
  <K extends string | number, MouseEventEnum extends MouseEvent | ReactMouseEvent, A0, A1, A2, A3>(
    callbackArg: (evt: MouseEventEnum, key: K, arg0: A0, arg1: A1, arg2: A2, arg3: A3) => void,
    callbackDependencies?: any[],
  ): [(key: K, arg0: A0, arg1: A1, arg2: A2, arg3: A3) => EventHandler, () => void];
  <
    K extends string | number,
    MouseEventEnum extends MouseEvent | ReactMouseEvent,
    A0,
    A1,
    A2,
    A3,
    A4
  >(
    callbackArg: (
      evt: MouseEventEnum,
      key: K,
      arg0: A0,
      arg1: A1,
      arg2: A2,
      arg3: A3,
      arg4: A4,
    ) => void,
    callbackDependencies?: any[],
  ): [(key: K, arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4) => EventHandler, () => void];
}

export const useMakeLamda: UseMakeLamda = <MouseEventEnum extends MouseEvent | ReactMouseEvent>(
  callbackArg: (evt: MouseEventEnum, key: string | number, ...restArgs: any[]) => void,
  callbackDependencies: any[] = fixedArray,
) => {
  const [update, forceUpdate] = useForceUpdate();
  const callback = useRef(callbackArg);
  useEffect(() => {
    callback.current = callbackArg;
  });
  const prev = usePrevious(callbackDependencies);
  const updateArgs =
    callbackDependencies === fixedArray ||
    (callbackDependencies.length !== 0 &&
      prev !== null &&
      callbackDependencies.some(
        (arg, index) => !Object.is(arg, prev[index]), // false if all array params are equal
      ));
  const allArgs = useRef<{ [x: string]: any[] }>({});
  const allCallbacks = useRef<{ [x: string]: (evt: MouseEventEnum) => void }>({});
  const makeLamda = useCallback(
    (key: string | number, ...restArgs: any[]) => {
      if (Object.hasOwnProperty.call(allCallbacks.current, key)) {
        if (updateArgs) {
          allArgs.current[key] = restArgs;
        }
        return allCallbacks.current[key];
      } else {
        allArgs.current[key] = restArgs;
        allCallbacks.current[key] = evt => {
          const currentArgs = allArgs.current[key];
          callback.current(evt, key, ...currentArgs);
        };

        return allCallbacks.current[key];
      }
    },
    [updateArgs, update],
  );

  const resetCache = useCallback(() => {
    allArgs.current = {};
    allCallbacks.current = {};
    forceUpdate();
  }, [forceUpdate]);

  const result = [makeLamda, resetCache] as [typeof makeLamda, typeof resetCache];

  return result;
};

export const useStateRefs = <
  S extends { [x: string]: unknown } | number | string | ((...arg: unknown[]) => unknown)
>(
  states: S,
) => {
  const stateRefs = useRef(states);

  useEffect(() => {
    stateRefs.current = states;
  }, Object.values(states)); // eslint-disable-line
  return stateRefs;
};
export const useStateRef = <S extends unknown>(initialState: S) => {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);
  // useEffect(() => {
  stateRef.current = state;
  // });
  return [stateRef, setState] as [typeof stateRef, typeof setState];
};

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

type Fields = Extract<keyof typeof makeForm, string>;

type FormUpdater = (event: ChangeEvent<HTMLInputElement>) => void;

// tslint:disable-next-line: interface-name
interface UseForm {
  <A extends Fields>(...fields: [A | [A, string] | ['deliveryMethod', DeliveryMethods]]): [
    Record<A, IInputConfig>,
    FormUpdater
  ];
  <A extends Fields, B extends Fields>(
    ...fields: [
      A | [A, string] | ['deliveryMethod', DeliveryMethods],
      B | [B, string] | ['deliveryMethod', DeliveryMethods]
    ]
  ): [Record<A | B, IInputConfig>, FormUpdater];
  <A extends Fields, B extends Fields, C extends Fields>(
    ...fields: [
      A | [A, string] | ['deliveryMethod', DeliveryMethods],
      B | [B, string] | ['deliveryMethod', DeliveryMethods],
      C | [C, string] | ['deliveryMethod', DeliveryMethods]
    ]
  ): [Record<A | B | C, IInputConfig>, FormUpdater];
  <A extends Fields, B extends Fields, C extends Fields, D extends Fields>(
    ...fields: [
      A | [A, string] | ['deliveryMethod', DeliveryMethods],
      B | [B, string] | ['deliveryMethod', DeliveryMethods],
      C | [C, string] | ['deliveryMethod', DeliveryMethods],
      D | [D, string] | ['deliveryMethod', DeliveryMethods]
    ]
  ): [Record<A | B | C | D, IInputConfig>, FormUpdater];
  <A extends Fields, B extends Fields, C extends Fields, D extends Fields, E extends Fields>(
    ...fields: [
      A | [A, string] | ['deliveryMethod', DeliveryMethods],
      B | [B, string] | ['deliveryMethod', DeliveryMethods],
      C | [C, string] | ['deliveryMethod', DeliveryMethods],
      D | [D, string] | ['deliveryMethod', DeliveryMethods],
      E | [E, string] | ['deliveryMethod', DeliveryMethods]
    ]
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
      A | [A, string] | ['deliveryMethod', DeliveryMethods],
      B | [B, string] | ['deliveryMethod', DeliveryMethods],
      C | [C, string] | ['deliveryMethod', DeliveryMethods],
      D | [D, string] | ['deliveryMethod', DeliveryMethods],
      E | [E, string] | ['deliveryMethod', DeliveryMethods],
      F | [F, string] | ['deliveryMethod', DeliveryMethods]
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
      A | [A, string] | ['deliveryMethod', DeliveryMethods],
      B | [B, string] | ['deliveryMethod', DeliveryMethods],
      C | [C, string] | ['deliveryMethod', DeliveryMethods],
      D | [D, string] | ['deliveryMethod', DeliveryMethods],
      E | [E, string] | ['deliveryMethod', DeliveryMethods],
      F | [F, string] | ['deliveryMethod', DeliveryMethods],
      G | [G, string] | ['deliveryMethod', DeliveryMethods]
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
      A | [A, string] | ['deliveryMethod', DeliveryMethods],
      B | [B, string] | ['deliveryMethod', DeliveryMethods],
      C | [C, string] | ['deliveryMethod', DeliveryMethods],
      D | [D, string] | ['deliveryMethod', DeliveryMethods],
      E | [E, string] | ['deliveryMethod', DeliveryMethods],
      F | [F, string] | ['deliveryMethod', DeliveryMethods],
      G | [G, string] | ['deliveryMethod', DeliveryMethods],
      H | [H, string] | ['deliveryMethod', DeliveryMethods]
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
      A | [A, string] | ['deliveryMethod', DeliveryMethods],
      B | [B, string] | ['deliveryMethod', DeliveryMethods],
      C | [C, string] | ['deliveryMethod', DeliveryMethods],
      D | [D, string] | ['deliveryMethod', DeliveryMethods],
      E | [E, string] | ['deliveryMethod', DeliveryMethods],
      F | [F, string] | ['deliveryMethod', DeliveryMethods],
      G | [G, string] | ['deliveryMethod', DeliveryMethods],
      H | [H, string] | ['deliveryMethod', DeliveryMethods],
      I | [I, string] | ['deliveryMethod', DeliveryMethods]
    ]
  ): [Record<A | B | C | D | E | F | G | H | I, IInputConfig>, FormUpdater];
}

export const useForm: UseForm = (...fields: any[]): any => {
  const [form, setForm] = useState(() => {
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
    [setForm],
  );
  return [form, updateForm];
};

export const useCheckRefEquality = <V extends any>(value: V, label: string = ''): boolean => {
  const previousValue = usePrevious(value);
  const count = useRef(0);
  useEffect(() => {
    count.current += 1;
  });
  // tslint:disable-next-line: no-console
  console.log(
    '````````````````````\n',
    label,
    '\nequal:',
    previousValue === value,
    '\ncount:',
    count.current,
    '\n===================',
  );
  return previousValue === value;
};
