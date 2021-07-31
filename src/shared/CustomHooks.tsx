import {
  useState,
  useCallback,
  ChangeEvent,
  useRef,
  useEffect,
  MouseEvent as ReactMouseEvent,
  ComponentType,
  useReducer,
  Reducer,
  ReducerState,
  ReducerAction,
  // Dispatch,
  useLayoutEffect,
  useMemo,
  useContext,
} from "react";
import { updateFormImmutably } from "../components/UI/Input";
import { AxiosInstance } from "axios";
import { Modal } from "../components/UI";
import { generateErrorMessage } from "./generateErrorMessage";
import { ReactReduxContext } from "react-redux";
import {
  AnyAction,
  bindActionCreators,
  ActionCreatorsMapObject,
  Dispatch,
} from "redux";
import { makeForm } from "../shared/makeForm";
import shallowEqual from "./shallowEqual";
import { EmptyObject } from "../types/general";
import {
  InputSelectConfig,
  InputTextConfig,
} from "c:/github/burger-builder/src/components/UI/Input/types/index";
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
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

export const useConditional2 = <P extends EmptyObject>(
  Component: ComponentType<P>
) => {
  const Check = useCallback(
    ({
      "r-if": rIF,
      ...props
    }: P & { "r-if": boolean }): ComponentType<P> | null => {
      return (rIF ? <Component {...(props as unknown as P)} /> : null) as any;
    },
    [Component]
  );

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
    setState((prev) => !prev);
  }, [setState]);
  return [state, forceUpdate] as [typeof state, typeof forceUpdate];
};

// const fixedArray: never[] = [];

// type MouseEventEnum = MouseEvent | ReactMouseEvent;

type EventHandler = <MouseEventEnum extends MouseEvent | ReactMouseEvent>(
  evt: MouseEventEnum
) => void;
interface UseMakeLamda {
  <
    K extends string | number,
    MouseEventEnum extends MouseEvent | ReactMouseEvent
  >(
    callbackArg: (evt: MouseEventEnum, key: K) => void,
    callbackDependencies?: any[]
  ): [(key: K) => EventHandler, () => void];
  <
    K extends string | number,
    MouseEventEnum extends MouseEvent | ReactMouseEvent,
    A0
  >(
    callbackArg: (evt: MouseEventEnum, key: K, arg0: A0) => void,
    callbackDependencies?: any[]
  ): [(key: K, arg0: A0) => EventHandler, () => void];
  <
    K extends string | number,
    MouseEventEnum extends MouseEvent | ReactMouseEvent,
    A0,
    A1
  >(
    callbackArg: (evt: MouseEventEnum, key: K, arg0: A0, arg1: A1) => void,
    callbackDependencies?: any[]
  ): [(key: K, arg0: A0, arg1: A1) => EventHandler, () => void];
  <
    K extends string | number,
    MouseEventEnum extends MouseEvent | ReactMouseEvent,
    A0,
    A1,
    A2
  >(
    callbackArg: (
      evt: MouseEventEnum,
      key: K,
      arg0: A0,
      arg1: A1,
      arg2: A2
    ) => void,
    callbackDependencies?: any[]
  ): [(key: K, arg0: A0, arg1: A1, arg2: A2) => EventHandler, () => void];
  <
    K extends string | number,
    MouseEventEnum extends MouseEvent | ReactMouseEvent,
    A0,
    A1,
    A2,
    A3
  >(
    callbackArg: (
      evt: MouseEventEnum,
      key: K,
      arg0: A0,
      arg1: A1,
      arg2: A2,
      arg3: A3
    ) => void,
    callbackDependencies?: any[]
  ): [
    (key: K, arg0: A0, arg1: A1, arg2: A2, arg3: A3) => EventHandler,
    () => void
  ];
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
      arg4: A4
    ) => void,
    callbackDependencies?: any[]
  ): [
    (key: K, arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4) => EventHandler,
    () => void
  ];
}

export const useMakeLamda: UseMakeLamda = <
  MouseEventEnum extends MouseEvent | ReactMouseEvent
>(
  callbackArg: (
    evt: MouseEventEnum,
    key: string | number,
    ...restArgs: any[]
  ) => void
) => {
  const [_update, forceUpdate] = useForceUpdate();
  const callback = useRef(callbackArg);
  useEffect(() => {
    callback.current = callbackArg;
  });
  // const prev = usePrevious(callbackDependencies);
  /*   const updateArgs =
    callbackDependencies.length !== 0 &&
    prev !== null &&
    callbackDependencies.some(
      (arg, index) => !Object.is(arg, prev[index]) // false if all array params are equal
    ); */
  const allArgs = useRef<{ [x: string]: any[] }>({});
  const allCallbacks = useRef<{ [x: string]: (evt: MouseEventEnum) => void }>(
    {}
  );
  const makeLamda = useCallback((key: string | number, ...restArgs: any[]) => {
    if (Object.hasOwnProperty.call(allCallbacks.current, key)) {
      // if (updateArgs) {
      allArgs.current[key] = restArgs;
      // }
      return allCallbacks.current[key];
    } else {
      allArgs.current[key] = restArgs;
      allCallbacks.current[key] = (evt) => {
        const currentArgs = allArgs.current[key];
        callback.current(evt, key, ...currentArgs);
      };

      return allCallbacks.current[key];
    }
  }, []);

  const resetCache = useCallback(() => {
    allArgs.current = {};
    allCallbacks.current = {};
    forceUpdate();
  }, [forceUpdate]);

  const result = [makeLamda, resetCache] as [
    typeof makeLamda,
    typeof resetCache
  ];

  return result;
};

export const useStateRefs = <
  S extends
    | { [x: string]: unknown }
    | number
    | string
    | ((...arg: unknown[]) => unknown)
>(
  states: S
) => {
  const stateRefs = useRef(states);

  useEffect(() => {
    stateRefs.current = states;
  }, Object.values(states)); // eslint-disable-line
  return stateRefs;
};
export const useStateRef = <S extends unknown>(initialState: S) => {
  // const [state, setState] = useState(initialState);
  const stateRef = useRef(initialState);
  useIsomorphicLayoutEffect(() => {
    stateRef.current = initialState;
  });
  return stateRef;
};

export type DeliveryMethods =
  | "cheapest"
  | "cheap"
  | "normal"
  | "expensive"
  | "very_expensive";
type MakeForm = typeof makeForm;
type Fields = Extract<keyof MakeForm, string>;

type FormUpdater = (event: ChangeEvent<HTMLInputElement>) => void;
type MakeFormReturn<F extends Fields> = ReturnType<MakeForm[F]>;
type MakeFormReturnPart<F extends Fields> = Partial<ReturnType<MakeForm[F]>>;
type RecordForm<F extends Fields> = { [K in F]: MakeFormReturn<K> };

type UseFormInput<A extends Fields> =
  | A
  | [A, string | MakeFormReturnPart<A>]
  | ["deliveryMethod", DeliveryMethods];

interface UseForm {
  <A extends Fields>(...fields: [UseFormInput<A>]): [
    RecordForm<A>,
    FormUpdater
  ];
  <A extends Fields, B extends Fields>(
    ...fields: [UseFormInput<A>, UseFormInput<B>]
  ): [RecordForm<A | B>, FormUpdater];
  <A extends Fields, B extends Fields, C extends Fields>(
    ...fields: [UseFormInput<A>, UseFormInput<B>, UseFormInput<C>]
  ): [RecordForm<A | B | C>, FormUpdater];
  <A extends Fields, B extends Fields, C extends Fields, D extends Fields>(
    ...fields: [
      UseFormInput<A>,
      UseFormInput<B>,
      UseFormInput<C>,
      UseFormInput<D>
    ]
  ): [RecordForm<A | B | C | D>, FormUpdater];
  <
    A extends Fields,
    B extends Fields,
    C extends Fields,
    D extends Fields,
    E extends Fields
  >(
    ...fields: [
      UseFormInput<A>,
      UseFormInput<B>,
      UseFormInput<C>,
      UseFormInput<D>,
      UseFormInput<E>
    ]
  ): [RecordForm<A | B | C | D | E>, FormUpdater];
  <
    A extends Fields,
    B extends Fields,
    C extends Fields,
    D extends Fields,
    E extends Fields,
    F extends Fields
  >(
    ...fields: [
      UseFormInput<A>,
      UseFormInput<B>,
      UseFormInput<C>,
      UseFormInput<D>,
      UseFormInput<E>,
      UseFormInput<F>
    ]
  ): [RecordForm<A | B | C | D | E | F>, FormUpdater];
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
      UseFormInput<A>,
      UseFormInput<B>,
      UseFormInput<C>,
      UseFormInput<D>,
      UseFormInput<E>,
      UseFormInput<F>,
      UseFormInput<G>
    ]
  ): [RecordForm<A | B | C | D | E | F | G>, FormUpdater];
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
      UseFormInput<A>,
      UseFormInput<B>,
      UseFormInput<C>,
      UseFormInput<D>,
      UseFormInput<E>,
      UseFormInput<F>,
      UseFormInput<G>,
      UseFormInput<H>
    ]
  ): [RecordForm<A | B | C | D | E | F | G | H>, FormUpdater];
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
      UseFormInput<A>,
      UseFormInput<B>,
      UseFormInput<C>,
      UseFormInput<D>,
      UseFormInput<E>,
      UseFormInput<F>,
      UseFormInput<G>,
      UseFormInput<H>,
      UseFormInput<I>
    ]
  ): [RecordForm<A | B | C | D | E | F | G | H | I>, FormUpdater];
}
export const useForm: UseForm = (
  ...fields: Array<
    | Fields
    | [Fields, string | MakeFormReturnPart<Fields>]
    | ["deliveryMethod", DeliveryMethods]
  >
) => {
  const [form, setForm] = useState(() => {
    const makeFormFields = (
      acc: RecordForm<Fields>,
      val:
        | Fields
        | ["deliveryMethod", DeliveryMethods]
        | [Fields, string | Partial<InputTextConfig | InputSelectConfig>]
    ): RecordForm<Fields> => {
      if (typeof val === "string") {
        return { ...acc, [val]: makeForm[val]() };
      } else if (
        Array.isArray(val) &&
        typeof val[0] === "string" &&
        (typeof val[1] === "object" || typeof val[1] === "string")
      ) {
        acc =
          val[1] != null
            ? { ...acc, [val[0]]: makeForm[val[0]](val[1] as any) }
            : acc;
      }
      return acc;
    };
    // const state = {};
    // fields.forEach(key => {
    //   if (typeof key === 'string') {
    //     (state as any)[key] = makeForm[key as keyof typeof makeForm]();
    //   } else if (Array.isArray(key) && (typeof key[0] === 'string' || typeof key[0] === 'number')) {
    //     (state as any)[key[0]] = (makeForm)[key[0]](key[1]);
    //   }
    // });
    // return state;
    return fields.reduce<RecordForm<Fields>>(makeFormFields, {} as any);
  });
  const updateForm: FormUpdater = useCallback(
    ({
      currentTarget: { name: field, value },
    }: ChangeEvent<HTMLInputElement>) => {
      setForm((oldForm) =>
        updateFormImmutably(oldForm, field as Fields, value)
      );
    },
    []
  );
  return [form, updateForm] as [typeof form, typeof updateForm];
};

export const useCheckRefEquality = <V extends any>(
  value: V,
  label = ""
): boolean => {
  const previousValue = usePrevious(value);
  const count = useRef(0);
  useEffect(() => {
    count.current += 1;
  });
  // tslint:disable-next-line: no-console
  console.log(
    "````````````````````\n",
    label,
    "\nequal: ",
    previousValue === value,
    "\nRender count: ",
    count.current,
    "\n==================="
  );
  return previousValue === value;
};

export function useStateWithGetter<S>(initialState: S | (() => S)) {
  const [state, setState] = useState(initialState);

  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  });

  const getState = useCallback(() => stateRef.current, []);

  return [state, setState, getState] as [
    typeof state,
    typeof setState,
    typeof getState
  ];
}

const wrapReducer =
  <R extends Reducer<any, any>>(reducer: R) =>
  (
    state: ReducerState<R>,
    action: ReducerAction<R> | ((prev: ReducerState<R>) => ReducerAction<R>)
  ) => {
    if (action instanceof Function) {
      return reducer(state, action(state)) as ReducerState<R>;
    } else {
      return reducer(state, action) as ReducerState<R>;
    }
  };

type ReducerActionFactory<R extends Reducer<any, any>> = (
  prev: ReducerState<R>
) => ReducerAction<R>;
interface GetterFunc<S> {
  (key?: undefined): S;
  <K extends keyof S>(key: K): S[K];
}
type Getter<S> = S extends []
  ? () => S
  : S extends ReadonlyArray<any>
  ? () => S
  : S extends EmptyObject
  ? GetterFunc<S>
  : () => S;

export function useReducerWithGetter<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & ReducerState<R>,
  initializer: (arg: I & ReducerState<R>) => ReducerState<R>
): [
  ReducerState<R>,
  React.Dispatch<ReducerAction<R> | ReducerActionFactory<R>>,
  Getter<ReducerState<R>>
];

export function useReducerWithGetter<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I,
  initializer: (arg: I) => ReducerState<R>
): [
  ReducerState<R>,
  React.Dispatch<ReducerAction<R> | ReducerActionFactory<R>>,
  Getter<ReducerState<R>>
];

export function useReducerWithGetter<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  initializer?: undefined
): [
  ReducerState<R>,
  React.Dispatch<ReducerAction<R> | ReducerActionFactory<R>>,
  Getter<ReducerState<R>>
];

export function useReducerWithGetter<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  initializer?: any
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const wrappedReducer = useMemo(() => wrapReducer(reducer), []);
  const [state, dispatch] = useReducer(
    wrappedReducer,
    initialState,
    initializer
  );

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  });

  const getState = useCallback((key?: string | number | symbol) => {
    const currentState = stateRef.current;
    return (typeof key === "string" ||
      typeof key === "number" ||
      typeof key === "symbol") &&
      typeof currentState === "object" &&
      !Array.isArray(currentState) &&
      currentState !== null &&
      Object.prototype.hasOwnProperty.call(currentState, key)
      ? currentState[key]
      : currentState;
  }, []);
  return [state, dispatch, getState] as [
    typeof state,
    typeof dispatch,
    typeof getState
  ];
}

export const useAxiosErrorHandler = (axios: AxiosInstance) => {
  const [currentError, setCurrentError] = useState<Error | null>(null);
  const res = useRef<number | null>(null);
  const req = useRef<number | null>(null);
  useIsomorphicLayoutEffect(() => {
    req.current = axios.interceptors.request.use(
      (req) => {
        setCurrentError(null);
        return req;
      },
      (error) => {
        throw error;
      }
    );
    res.current = axios.interceptors.response.use(
      (req) => req,
      (error) => {
        setCurrentError(error);
        throw error;
      }
    );
    return () => {
      if (req.current !== null) {
        axios.interceptors.request.eject(req.current);
      }
      if (res.current !== null) {
        axios.interceptors.response.eject(res.current);
      }
    };
  }, []);

  const errorConfirmed = useCallback(() => {
    setCurrentError(null);
  }, []);
  return currentError ? (
    <Modal show={!!currentError} hider={errorConfirmed} zIndex={800}>
      {generateErrorMessage(currentError)}
    </Modal>
  ) : null;
};

// const _ObjectDeepEquality = (
//   obj1: string | symbol | Record<string, any> | Function | any[] | number | null | undefined,
//   obj2: string | symbol | Record<string, any> | Function | any[] | number | null | undefined,
//   currentDepth: number = 0,
//   maxDepth: number = 2,
// ): boolean => {
//   if (currentDepth > maxDepth) {
//     return obj1 === obj2;
//   }
//   if (obj1 === null || obj2 === null) {
//     return obj1 === obj2;
//   }
//   if (
//     typeof obj1 === 'object' &&
//     !Array.isArray(obj1) &&
//     typeof obj2 === 'object' &&
//     !Array.isArray(obj2)
//   ) {
//     for (const key in obj1) {
//       if (obj1[key] === null || obj2[key] === null) {
//         return obj1[key] === obj2[key];
//       }
//       if (typeof obj1[key] === 'object') {
//         if (!_ObjectDeepEquality(obj1[key], obj2[key], currentDepth + 1)) {
//           return false;
//         }
//       } else if (!Object.is(obj1[key], obj2[key])) {
//         return false;
//       }
//     }
//     for (const key in obj2) {
//       if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
//         return false;
//       }
//     }
//   } else if (Array.isArray(obj1) && Array.isArray(obj2)) {
//     if (obj1.length !== (obj2 as any[]).length) {
//       return false;
//     }
//     for (let key = 0; key < obj1.length; key += 1) {
//       if (obj1[key] === null || (obj2 as any[])[key] === null) {
//         return obj1[key] === (obj2 as any[])[key];
//       }
//       if (typeof obj1[key] === 'object') {
//         if (!_ObjectDeepEquality(obj1[key], obj2[key], currentDepth + 1)) {
//           return false;
//         }
//       } else if (!Object.is(obj1[key], obj2[key])) {
//         return false;
//       }
//     }
//   } else {
//     if (!Object.is(obj1, obj2)) {
//       return false;
//     }
//   }
//   return true;
// };
interface UseRedux {
  <S, CS, D extends Dispatch<AnyAction>, CD extends ActionCreatorsMapObject>(
    mapStateToProps: (state: S) => CS,
    mapDispatchToProps: (dispatch: D) => CD
  ): Readonly<[CS, CD]>;
  <S, CS>(
    mapStateToProps: (state: S) => CS,
    mapDispatchToProps?: undefined
  ): Readonly<[CS, Dispatch<AnyAction>]>;
  <S, CS, D extends Dispatch<AnyAction>, CD extends ActionCreatorsMapObject>(
    mapStateToProps: (state: S) => CS,
    mapDispatchToProps: CD
  ): Readonly<[CS, CD]>;
  <D extends Dispatch<AnyAction>, CD extends ActionCreatorsMapObject>(
    mapStateToProps: null,
    mapDispatchToProps: (dispatch: D) => CD
  ): Readonly<[null, CD]>;
  <CD extends ActionCreatorsMapObject>(
    mapStateToProps: null,
    mapDispatchToProps: CD
  ): Readonly<[null, CD]>;
  (mapStateToProps: null, mapDispatchToProps?: undefined): Readonly<
    [null, Dispatch<AnyAction>]
  >;
}

export const useRedux: UseRedux = <
  S extends EmptyObject,
  CS,
  CD extends ActionCreatorsMapObject
>(
  mapStateToProps?: ((state: S) => CS) | null,
  mapDispatchToProps?: ((dispatch: Dispatch<AnyAction>) => CD) | CD
) => {
  const context = useContext(ReactReduxContext);
  if (context == null) {
    throw new Error("store is null or undefined");
  }
  const dispatch = useMemo(
    () =>
      mapDispatchToProps != null &&
      (typeof mapDispatchToProps === "object" ||
        typeof mapDispatchToProps === "function")
        ? mapDispatchToProps instanceof Function
          ? mapDispatchToProps(context.store.dispatch)
          : bindActionCreators(mapDispatchToProps, context.store.dispatch)
        : context.store.dispatch,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context.store.dispatch]
  );
  const mapStateToPropsRef = useRef(mapStateToProps);
  useIsomorphicLayoutEffect(() => {
    mapStateToPropsRef.current = mapStateToProps;
  });
  const [state, setState] = useState(() => {
    if (mapStateToProps == null) {
      return null;
    }
    return mapStateToProps(context.store.getState());
  });
  const stateRef = useRef(state);
  useIsomorphicLayoutEffect(() => {
    stateRef.current = state;
  });
  useIsomorphicLayoutEffect(
    () =>
      context.store.subscribe(() => {
        const latestMapState = mapStateToPropsRef.current;
        const latestState =
          latestMapState != null
            ? latestMapState(context.store.getState())
            : null;
        if (!shallowEqual(stateRef.current, latestState)) {
          setState(latestState);
        }
      }),
    [context.store]
  );

  return [state, dispatch] as Readonly<[any, any]>;
};
