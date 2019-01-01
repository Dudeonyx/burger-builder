import { store } from '../store';
import { InferableComponentEnhancerWithProps } from 'react-redux';

declare type GetConnectProps<C> = C extends InferableComponentEnhancerWithProps<
  infer P,
  any
>
  ? P
  : never;
