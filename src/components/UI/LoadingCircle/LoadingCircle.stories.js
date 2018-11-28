import React from 'react';
import { storiesOf } from '@storybook/react';
import LoadingCircle from './LoadingCircle';

const styles = {
  height: '200px',
};
storiesOf( 'LoadingCircle', module )
  .add( 'Default', () => <LoadingCircle /> )
  .add( 'Default in a larger container', () => (
    <div style={styles}>
      <LoadingCircle />
    </div>
  ) )
  .add( '150px', () => <LoadingCircle style={{ '--size': '150px' }} /> )
  .add( '200px', () => <LoadingCircle style={{ '--size': '200px' }} /> )
  .add( '300px', () => <LoadingCircle style={{ '--size': '300px' }} /> );
