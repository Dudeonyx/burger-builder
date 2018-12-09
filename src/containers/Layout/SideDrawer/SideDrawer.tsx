import React, {
  FunctionComponent,
  lazy,
  MouseEventHandler,
  Suspense
} from 'react';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import styled from 'styled-components';

const Logo = lazy(() => import('../../../components/UI/Logo/Logo'));

export interface ISideDrawerProps {
  open: boolean;
  hider: MouseEventHandler;
}

const StyledSideDrawer = styled.div`
  &.SideDrawer {
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
    transform: ${(props: { open: boolean }) =>
      props.open ? 'translateX(0)' : 'translateX(-100%)'};
  }

  @media (min-width: 500px) {
    &.SideDrawer {
      display: none;
    }
  }
`;

const SideDrawer: FunctionComponent<ISideDrawerProps> = ({ open, hider }) => {
  return (
    <>
      <Backdrop show={open} hider={hider} />
      <StyledSideDrawer open={open} className="SideDrawer" onClick={hider}>
        <Suspense fallback={<p>Logo...</p>}>
          <Logo height="11%" link="##" HQ={true} />
        </Suspense>
        <nav>
          <NavigationItems />
        </nav>
      </StyledSideDrawer>
    </>
  );
};

export default SideDrawer;
