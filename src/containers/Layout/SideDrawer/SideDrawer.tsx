import React, { FunctionComponent, MouseEventHandler } from 'react';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import styled from '@emotion/styled/macro';
import Logo from '../../../components/UI/Logo/Logo';

export interface SideDrawerProps {
  open: boolean;
  hider: MouseEventHandler;
}
interface StyledSideDrawerProps {
  open: boolean;
}
const setTranslate = ({ open }: StyledSideDrawerProps) => {
  return open ? 'translateX(0)' : 'translateX(-100%)';
};
const StyledSideDrawer = styled.div<StyledSideDrawerProps>`
  & {
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    padding: 32px 16px;
    box-sizing: border-box;
    transition: transform 0.3s ease-in-out;
    z-index: 200;
    height: 100%;
    width: 70%;
    transform: ${setTranslate};
  }

  @media (min-width: 500px) {
    & {
      display: none;
    }
  }
`;

const SideDrawer: FunctionComponent<SideDrawerProps> = ({ open, hider }) => {
  return (
    <>
      <Backdrop show={open} hider={hider} />
      <StyledSideDrawer open={open} onClick={hider}>
        <Logo height="11%" link="/" HQ={true} />
        <nav>
          <NavigationItems />
        </nav>
      </StyledSideDrawer>
    </>
  );
};

export default SideDrawer;
