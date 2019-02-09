import React, { MouseEventHandler, FunctionComponent } from 'react';
import styled from '@emotion/styled/macro';

// React;

const StyledDrawerToggle = styled.div`
  & {
    height: 100%;
    padding: 0;
    width: 3em;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 5px;
    box-sizing: border-box;
  }

  & > div {
    width: 85%;
    height: 3px;
    border-radius: 1px;
    background-color: white;
  }

  &:hover,
  &:active {
    background-color: rgba(255, 255, 255, 0.123);
    box-shadow: 1px 0px 0px black;
  }

  @media (min-width: 500px) {
    & {
      display: none;
    }
  }
`;
export interface IDrawerToggle {
  clicked: MouseEventHandler;
}

const DrawerToggle: FunctionComponent<IDrawerToggle> = ({ clicked }) => {
  return (
    <StyledDrawerToggle onClick={clicked}>
      <div />
      <div />
      <div />
    </StyledDrawerToggle>
  );
};

export default DrawerToggle;
