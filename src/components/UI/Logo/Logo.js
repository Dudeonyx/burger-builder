import React from 'react';
import logo from './../../../assets/images/26.1 burger-logo.png.png';
import styles from './Logo.module.css';

const Logo = props => {
  return (
    <a
      href={props.link}
      className={styles.Logo}
      style={{ height: props.height }}
    >
      <img src={logo} alt="A Burger Logo" />
    </a>
  );
};

export default Logo;
