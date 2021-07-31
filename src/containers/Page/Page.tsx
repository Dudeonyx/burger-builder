import {
  FunctionComponent,
  // useState,
  // useMemo,
  ReactChild,
  MouseEvent,
  useRef,
  useEffect,
  ReactNode,
  useMemo,
  useState,
  useCallback,
  memo,
} from "react";
import {
  useForceUpdate,
  useMakeLamda,
  useRedux,
} from "../../shared/CustomHooks";
import styled from "@emotion/styled/macro";
import { css } from "@emotion/react/macro";
import {
  selectIngredients,
  getTotalPriceFromStore,
} from "../../store/selectors";
import { Store } from "../../store";
// import OrderSummary from '../../components/OrderSummary/OrderSummary';
import {
  setIngredients,
  increaseIngredient,
  decreaseIngredient,
} from "../../store/actions";

const localIngs = { bacon: 0, cheese: 0, meat: 0, salad: 0 };
const Page: FunctionComponent = () => {
  const [state, setState] = useState(() =>
    Array.from(Array(30).keys(), (n) => ({ value: n + 1, id: Math.random() }))
  );

  const count = useRef(0);
  useEffect(() => {
    count.current += 1;
  });

  const [makeLamda] = useMakeLamda(
    (_evt: MouseEvent, key: number, currentCount: number, itemNo: number) => {
      console.log(
        `Removed 'List Item ${itemNo}', current count: ${currentCount}`
      );
      setState((prevState) => prevState.filter((n) => n.id !== key));
    },
    []
  );
  const [, forceUpdate] = useForceUpdate();

  const list = useMemo(
    () =>
      state.map((item) => (
        <Div
          key={item.id}
          onClick={makeLamda(item.id, count.current, item.value)}
        >
          {`List Item: ${item.value}`}
        </Div>
      )),
    [state, makeLamda]
  );

  const [, dispatch] = useRedux(null, {
    setIngredients,
    // increaseIngredient,
    // decreaseIngredient
  });
  useEffect(() => {
    dispatch.setIngredients(localIngs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Div>
        <Ingredient1 />
        <Ingredient2 />
        <Div>
          <TotalPrice />
        </Div>
      </Div>
      <Div>
        <Div
          as="button"
          onClick={() => dispatch.setIngredients(localIngs)}
          name="salad"
          children={"Reset Ingredients"}
        />
      </Div>
      <Div>
        <Div as="button" onClick={forceUpdate} children={"Trigger Re-render"} />
      </Div>
      {list}
    </>
  );
};

export default Page;

const Ingredient1 = () => {
  const [{ bacon, meat }, dispatch] = useRedux(
    (state: Store) => {
      const currentState = selectIngredients(state);
      return {
        bacon: currentState != null ? currentState.bacon : 0,
        meat: currentState != null ? currentState.meat : 0,
      };
    },
    {
      increaseIngredient,
      decreaseIngredient,
    }
  );
  const ingredientList = useMemo(
    () => (
      <>
        <div>{`bacon: ${bacon}`}</div>
        <div>{`meat: ${meat}`}</div>
      </>
    ),
    [meat, bacon]
  );
  const addIng = useCallback(
    ({ currentTarget: { name } }: MouseEvent<any>) => {
      dispatch.increaseIngredient(name);
    },
    [dispatch]
  );
  const subIng = useCallback(
    ({ currentTarget: { name } }: MouseEvent<any>) => {
      dispatch.decreaseIngredient(name);
    },
    [dispatch]
  );
  const buttons = useMemo(
    () => (
      <>
        <Div>
          <Div as="button" onClick={subIng} name="bacon" children={"bacon -"} />
          <Div as="button" onClick={addIng} name="bacon" children={"bacon +"} />
        </Div>
        <Div>
          <Div as="button" onClick={subIng} name="meat" children={"meat -"} />
          <Div as="button" onClick={addIng} name="meat" children={"meat +"} />
        </Div>
      </>
    ),
    [addIng, subIng]
  );
  return (
    <>
      {buttons}
      <Div>{ingredientList}</Div>
    </>
  );
};
const Ingredient2 = () => {
  const [{ salad, cheese }, dispatch] = useRedux(
    (state: Store) => {
      const currentState = selectIngredients(state);
      return {
        cheese: currentState != null ? currentState.cheese : 0,
        salad: currentState != null ? currentState.salad : 0,
        // totalPrice: getTotalPriceFromStore(state),
      };
    },
    {
      increaseIngredient,
      decreaseIngredient,
    }
  );
  const ingredientList = useMemo(
    () => (
      <>
        <div>{`cheese: ${cheese}`}</div>
        <div>{`salad: ${salad}`}</div>
        {/* <div>{`totalPrice: ${totalPrice}`}</div> */}
      </>
    ),
    [cheese, salad]
  );
  const addIng = useCallback(
    ({ currentTarget: { name } }: MouseEvent<any>) => {
      dispatch.increaseIngredient(name);
    },
    [dispatch]
  );
  const subIng = useCallback(
    ({ currentTarget: { name } }: MouseEvent<any>) => {
      dispatch.decreaseIngredient(name);
    },
    [dispatch]
  );
  const buttons = useMemo(
    () => (
      <>
        <Div>
          <Div as="button" onClick={subIng} name="salad" children={"salad -"} />
          <Div as="button" onClick={addIng} name="salad" children={"salad +"} />
        </Div>
        <Div>
          <Div
            as="button"
            onClick={subIng}
            name="cheese"
            children={"cheese -"}
          />
          <Div
            as="button"
            onClick={addIng}
            name="cheese"
            children={"cheese +"}
          />
        </Div>
      </>
    ),
    [addIng, subIng]
  );
  return (
    <>
      {buttons}
      <Div>{ingredientList}</Div>
    </>
  );
};
const TotalPrice = () => {
  const [{ totalPrice }] = useRedux((state: Store) => ({
    totalPrice: getTotalPriceFromStore(state),
  }));
  return <div>{`totalPrice: ${totalPrice}`}</div>;
};
const styles = css`
  margin: 5px;
  border: 1px black solid;
  border-radius: 6px;
  padding: 5px;
  text-align: center;
  text-shadow: 1px 1px 2px grey;
  font-variant: small-caps;
  font-weight: bold;
`;
interface DivProps {
  onClick?: (...a: any[]) => void;
  className?: string;
  children?: ReactChild | ReactChild[];
  as?: ReactNode | keyof JSX.IntrinsicElements;
  name?: string;
}
const Div = memo(styled.div<DivProps>`
  ${styles}
`);
