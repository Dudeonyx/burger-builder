import { useEffect, useCallback, useReducer } from "react";
import styled from "@emotion/styled/macro";
import { useRef } from "react";
// import { useStateRefs } from '../../shared/CustomHooks';
import { createSlice } from "@redux-ts-starter-kit/slice";
import { useStateRef } from "../../shared/CustomHooks";

interface SwipeableListItemProps {
  threshold?: number;
  onSwipe: () => void;
}

const initialState = {
  leftX: 0,
  bgOpacity: "0",
  maxHeight: "10000",
  listElClasses: "ListItem",
};

const { reducer, actions } = createSlice({
  name:'',
  initialState,
  cases: {
    setLeftX: (state, leftX: number) => {
      state.leftX = leftX;
    },
    updateOpacity: (state) => {
      const newOpacity = +(Math.abs(state.leftX) / 100).toFixed(2);
      if (newOpacity < 1 && newOpacity.toString() !== state.bgOpacity) {
        state.bgOpacity = newOpacity.toString();
      } else if (newOpacity >= 1) {
        state.bgOpacity = "1";
      }
    },
    setMaxHeight: (state, height: string) => {
      state.maxHeight = height;
    },
    setListElClasses: (state, classes: string) => {
      state.listElClasses = classes;
    },
  },
});

const SwipeableListItem: React.FC<SwipeableListItemProps> = ({
  children,
  threshold = 0.35,
  onSwipe,
}) => {
  const [{ leftX, bgOpacity, listElClasses, maxHeight }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const leftXRef = useStateRef(leftX);
  const dragStartX = useRef(0);
  const dragged = useRef(false);
  // const fpsInterval = useRef(1000 / 60);
  const listElement = useRef<HTMLDivElement>(null);
  // const wrapper = useRef<HTMLDivElement>(null);
  // const background = useRef<HTMLDivElement>(null);

  const onDragStart = useCallback((clientX: number) => {
    dragStartX.current = clientX;
    dragged.current = true;
    dispatch(actions.setListElClasses("ListItem"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMouseMove = useCallback(
    (evt: MouseEvent) => {
      // console.log(evt.clientX, dragStartX.current);
      const newLeftX = evt.clientX - dragStartX.current;
      // console.log(left);
      if (newLeftX < 0) {
        dispatch(actions.setLeftX(newLeftX));
      }
      dispatch(actions.updateOpacity());
    },
    [dispatch]
  );
  const onTouchMove = useCallback((evt: TouchEvent) => {
    const touch = evt.targetTouches[0];
    const newLeftX = touch.clientX - dragStartX.current;
    if (newLeftX < 0) {
      dispatch(actions.setLeftX(newLeftX));
    }
    dispatch(actions.updateOpacity());
  }, []);

  const onDragStartMouse = useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      onDragStart(evt.clientX);
      window.addEventListener("mousemove", onMouseMove);
    },
    [onDragStart, onMouseMove]
  );
  const onDragStartTouch = useCallback(
    (evt: React.TouchEvent<HTMLDivElement>) => {
      const touch = evt.targetTouches[0];
      onDragStart(touch.clientX);
      window.addEventListener("touchmove", onTouchMove);
    },
    [onDragStart, onTouchMove]
  );

  const onDragEnd = useCallback(() => {
    if (dragged.current) {
      dragged.current = false;
      if (listElement.current === null) {
        throw new Error("listElement ref is `null`");
      }
      if (listElement.current != null) {
        if (
          leftXRef.current <
          -1 * listElement.current.offsetWidth * threshold
        ) {
          dispatch(actions.setLeftX(-1 * listElement.current.offsetWidth * 2));
          onSwipe();
          dispatch(actions.setMaxHeight("0"));
        } else {
          dispatch(actions.setLeftX(0));
          dispatch(actions.updateOpacity());
        }
      }
      dispatch(actions.setListElClasses("ListItem Bouncing"));
    }
  }, [leftXRef, threshold, onSwipe]);
  const onDragEndMouse = useCallback(() => {
    window.removeEventListener("mousemove", onMouseMove);
    onDragEnd();
  }, [onMouseMove, onDragEnd]);
  const onDragEndTouch = useCallback(() => {
    window.removeEventListener("touchmove", onTouchMove);
    onDragEnd();
  }, [onTouchMove, onDragEnd]);
  useEffect(() => {
    window.addEventListener("mouseup", onDragEndMouse);
    window.addEventListener("touchend", onDragEndTouch);
    return () => {
      window.removeEventListener("mouseup", onDragEndMouse);
      window.removeEventListener("touchend", onDragEndTouch);
    };
  }, [onDragEndMouse, onDragEndTouch]);

  return (
    <Wrapper
      bgOpacity={bgOpacity}
      listTransform={leftX}
      listOpacity={1.8 - +bgOpacity}
      wrapperHeight={maxHeight} /* ref={wrapper} */
    >
      <div className="Background" /* ref={background} */>
        <span>Delete</span>
      </div>
      <div
        className={listElClasses}
        ref={listElement}
        onMouseDown={onDragStartMouse}
        onTouchMove={onDragStartTouch}
      >
        {children}
      </div>
    </Wrapper>
  );
};

export default SwipeableListItem;

interface WrapperProps {
  listTransform: string | number;
  bgOpacity: string | number;
  wrapperHeight: string | number;
  listOpacity: string | number;
}

const Wrapper = styled.div<WrapperProps>`
  & {
    position: relative;
    transition: max-height 0.5s ease;
    max-height: ${(props) => props.wrapperHeight}px;
    transform-origin: top;
    overflow: hidden;
    width: 100%;
  }
  & > .Bouncing {
    transition: transform 0.5s ease-out;
  }
  & > .Background {
    opacity: ${(props) => props.bgOpacity};
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-right: 16px;
    color: white;
    background-color: #663bb7;
    box-sizing: border-box;
  }

  & > .ListItem {
    transform: translateX(${(props) => props.listTransform}px);
    opacity: ${(props) => props.listOpacity};
    width: 100%;
    align-items: center;
    box-sizing: border-box;
    background-color: #fff;
    height: 100%;
    display: flex;
  }
`;
