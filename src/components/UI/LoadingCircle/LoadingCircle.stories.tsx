import { storiesOf } from '@storybook/react';
import React from 'react';
import { LoadingCircle } from './LoadingCircle';

const styles = {
  '--size': '80px',
  alignItems: 'center',
  display: 'flex',
  height: 'calc(var(--size, 80px) * 1.2)',
  justifyContent: 'center',
};
storiesOf('LoadingCircle', module)
  .add('LoadingCircle', () => <LoadingCircle style={styles} />)
  .add('150px', () => <LoadingCircle style={{ '--size': '150px' }} />)
  .add('200px', () => <LoadingCircle style={{ '--size': '200px' }} />)
  .add('300px', () => <LoadingCircle style={{ '--size': '300px' }} />);
