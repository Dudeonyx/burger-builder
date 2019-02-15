import React, {
  FunctionComponent,
  lazy,
  MouseEventHandler,
  Suspense,
} from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from './DrawerToggle/DrawerToggle';
import Logo from '../../../components/UI/Logo/Logo';
import styled from '@emotion/styled/macro';

const StyledToolbar = styled.header`
  & {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 5px;
    background-color: chocolate;
    color: whitesmoke;
    height: 3em;
  }

  & > nav {
    height: 100%;
  }

  @media (max-width: 499px) {
    .DesktopOnly {
      display: none;
    }
  }
`;
export interface IToolbarProps {
  drawerToggler: MouseEventHandler;
}
const Toolbar: FunctionComponent<IToolbarProps> = ({
  drawerToggler,
}) => {
  return (
    <StyledToolbar>
      <DrawerToggle clicked={drawerToggler} />
      <Logo link="/" HQ={true} />
      <nav className="DesktopOnly">
        <NavigationItems />
      </nav>
    </StyledToolbar>
  );
};

export default Toolbar;
