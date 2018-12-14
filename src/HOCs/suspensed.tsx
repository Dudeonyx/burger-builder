import React, {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ComponentType,
  ExoticComponent,
  ForwardRefExoticComponent,
  lazy,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
  RefForwardingComponent,
  Suspense,
  ReactElement
} from 'react';
import Loader from '../components/UI/Loader/Loader';

type Suspensed = <P>(L: ExoticComponent<P>) => ComponentType<P>;

export const suspensed: Suspensed = LazyComponent => {
  return function SuspensedComponent(props) {
    return (
      <Suspense fallback={<Loader />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

type Suspensed2 = <T extends ComponentType<any>>(
  d: Promise<{ default: T }>
) => ComponentType<ComponentPropsWithoutRef<T>>;

export const suspensed2: Suspensed2 = dynamicImport => {
  const LazyComponent = lazy(() => dynamicImport) as ExoticComponent<any>;
  return function SuspensedComponent(props) {
    return (
      <Suspense fallback={<Loader />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
  // return SuspensedComponent;
};

export type Suspensed3 = <T extends ComponentType<any>>(
  d: Promise<{ default: T }>
) => ForwardRefExoticComponent<ComponentPropsWithoutRef<T> & RefAttributes<T>>;
export const suspensed3: Suspensed3 = dynamicImport => {
  const LazyComponent = lazy(() => dynamicImport) as ExoticComponent<any>;
  return React.forwardRef((props, ref) => {
    return (
      <Suspense fallback={<Loader />}>
        <LazyComponent {...props} ref={ref} />
      </Suspense>
    );
  }) as any;
  // return SuspensedComponent;
};
export const suspenseNode = <P extends {}>(
  LazyComponent: ExoticComponent<P>,
  props: P,
  Fallback?: ComponentType
): ReactNode => {
  return (
    <Suspense fallback={Fallback ? <Fallback /> : <Loader />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
export const suspenseNode2 = <P extends {}>(
  LazyComponent: ExoticComponent<P>,
  Fallback: ReactNode = <Loader />
): ((props: P) => ReactElement<P>) => props => (
  <Suspense fallback={Fallback}>
    <LazyComponent {...props} />
  </Suspense>
);

export default {
  suspensed,
  suspenseNode,
  suspensed2,
  suspenseNode2,
  suspensed3
};
