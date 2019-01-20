import React, { FunctionComponent, memo } from 'react';
import BuildControl from './BuildControl/BuildControl';
import { IbuildControlsProps, Tcontrols } from './types/';
import styled from '@emotion/styled/macro';

const controls: Tcontrols = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const StyledBuildControls = styled.div`
  & {
    width: 100%;
    background-color: #cf8f2e;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 1px #ccc;
    margin: auto;
    padding: 10px 0;
    /* font-size: 0.9rem; */
  }
  & p {
    margin: 10px 0;
  }
  .OrderButton {
    background-color: #becf2d;
    padding: 10px;
    border-radius: 4px;
    outline: none;
    border: none;
    color: #7c581c;
    font-size: 1.05rem;
    box-shadow: 1px 1px 1px 1px #727c1b;
    font-weight: 400;
  }

  .OrderButton:hover,
  .OrderButton:active {
    background-color: #d2dd6c;
    /* background-color: rgb(226, 19, 19); */
    /* color: #cf8f2e; */
    box-shadow: 1px 1px 1px 1px #393e0e;
  }

  .OrderButton:disabled {
    cursor: not-allowed;
    color: gray;
    background-color: darkgray;
    box-shadow: 1px 1px 1px 1px gray;
    animation: disable 0.4s linear;
  }

  .OrderButton:not(:disabled) {
    animation: enable 0.3s linear;
  }

  @keyframes enable {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(1.05);
    }
    50% {
      transform: scale(1.1);
    }
    66% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes disable {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(0.92);
    }
    50% {
      transform: scale(0.86);
    }
    66% {
      transform: scale(0.92);
    }
    100% {
      transform: scale(1);
    }
  }
`;
const buildControls: FunctionComponent<IbuildControlsProps> = ({
  decrease,
  increase,
  ingredients,
  price,
  purchaseable,
  purchaseStart,
}) => {
  return (
    <StyledBuildControls>
      <p>
        Current Price: <strong>${price}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => increase(ctrl.type)}
          removed={() => decrease(ctrl.type)}
          disabled={ingredients[ctrl.type] <= 0}
        />
      ))}
      <button
        onClick={purchaseStart}
        className="OrderButton"
        disabled={!purchaseable}
      >
        ORDER NOW
      </button>
    </StyledBuildControls>
  );
};

export default memo(buildControls);
