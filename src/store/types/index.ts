import { InferableComponentEnhancerWithProps } from 'react-redux';

export type GetConnectProps<C> = C extends InferableComponentEnhancerWithProps<
  infer P,
  any
>
  ? P
  : never;
