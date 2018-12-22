import { store } from '../store';
import { InferableComponentEnhancerWithProps } from 'react-redux';

export type IstoreState = ReturnType<typeof store.getState>;

declare type GetConnectProps<C> = C extends InferableComponentEnhancerWithProps<
  infer P,
  any
>
  ? P
  : never;
