import React, {
  FunctionComponent,
  useState,
  // useMemo,
  ReactChild,
  MouseEvent,
  useRef,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import { useForceUpdate, useMakeLamda } from '../../shared/CustomHooks';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';

const Page: FunctionComponent = () => {
  const [state, setState] = useState(() =>
    Array.from(Array(30).keys(), n => ({ value: n + 1, id: Math.random() })),
  );

  const count = useRef(0);
  useEffect(() => {
    count.current += 1;
  });

  const [makeLamda] = useMakeLamda(
    (_evt: MouseEvent, key: number, currentCount: number, itemNo: number) => {
      console.log(`Removed 'List Item ${itemNo}', current count: ${currentCount}`);
      setState(prevState => prevState.filter(n => n.id !== key));
    },
    [],
  );
  const [, forceUpdate] = useForceUpdate();

  const list = useMemo(
    () =>
      state.map(item => (
        <Div key={item.id} onClick={makeLamda(item.id, count.current, item.value)}>
          {`List Item: ${item.value}`}
        </Div>
      )),
    [state, makeLamda],
  );

  return (
    <>
      <Div>
        <Div as="button" onClick={forceUpdate} children={'Trigger Re-render'} />
      </Div>
      {list}
      {/* <div>{Math.random() > 0.5 ? <p>{'There he is'}</p> : <p>{'Where\'s the baby?'}</p>}</div> */}
    </>
  );
};

export default Page;

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
  children?: ReactChild;
  as?: ReactNode | keyof JSX.IntrinsicElements;
}
const Div = React.memo(styled.div<DivProps>`
  ${styles}
`);
