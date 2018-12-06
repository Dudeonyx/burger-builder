import React, { FunctionComponent } from 'react';
import styles from './Orders.module.css';
// tslint:disable-next-line:no-empty-interface
export interface IOrdersState {
  demoState: number;
}
const Orders: FunctionComponent<{}> = props => {
  return <div className={styles.OrdersWrapper}>Test content</div>;
};

// Orders.propTypes = {
//   // bla: PropTypes.string,
// };

// Orders.defaultProps = {
//   // bla: 'test',
// };

export default Orders;
