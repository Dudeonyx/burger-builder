import {
  ComponentPropsWithoutRef,
  ComponentType,
  ExoticComponent,
  ForwardRefExoticComponent,
  lazy,
  ReactNode,
  RefAttributes,
  Suspense,
  ReactElement,
  forwardRef,
} from "react";
import Loader from "../components/UI/Loader/Loader";
import { AnyObject } from "../types/general";

type Suspensed = <P>(L: ExoticComponent<P>) => ComponentType<P>;

export const suspensed: Suspensed = (LazyComponent) => {
  return function SuspensedComponent(props) {
    return (
      <Suspense fallback={<Loader />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

export const suspensed2 = <T extends ComponentType<any>>(
  dynamicImport: Promise<{ default: T }>
): ComponentType<ComponentPropsWithoutRef<T>> => {
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

export const suspensed3 = <T extends ComponentType<any>>(
  dynamicImport: Promise<{ default: T }>
): ForwardRefExoticComponent<
  ComponentPropsWithoutRef<T> & RefAttributes<T>
> => {
  const LazyComponent = lazy(() => dynamicImport) as ExoticComponent<any>;
  return forwardRef((props, ref) => {
    return (
      <Suspense fallback={<Loader />}>
        <LazyComponent {...props} ref={ref} />
      </Suspense>
    );
  }) as any;
  // return SuspensedComponent;
};
export const suspenseNode = <P extends AnyObject>(
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
// eslint-disable-next-line @typescript-eslint/ban-types
export const suspenseNode2 = <P extends {}>(
  LazyComponent: ExoticComponent<P>,
  Fallback: ReactNode = <Loader />
): ((props: P) => ReactElement<P>) =>
  function Suspender(props) {
    return (
      <Suspense fallback={Fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

const defaultExport = {
  suspensed,
  suspenseNode,
  suspensed2,
  suspenseNode2,
  suspensed3,
};
export default defaultExport;
