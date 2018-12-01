import React from 'react';
import { storiesOf } from '@storybook/react';

import { Modal } from './Modal';
import { action } from '@storybook/addon-actions';

storiesOf( 'Modal', module )
  .add( 'Visible', () => (
    <Modal show={true} hider={action( 'hide' )}>
      <div>
        <p>Hullo</p>
        <p>Hullo</p>
        <p>Hullo</p>
        <p>Hullo</p>
      </div>
    </Modal>
  ) )
  .add( 'Double nest', () => (
    <Modal show={true} hider={action( 'hide' )}>
      <div>
        <p>
          <span>Hullo</span>
        </p>
        <p>
          <p>Hullo</p>
        </p>
        <div>
          <p>Hullo!!!</p>
        </div>
        <p>
          <span>Hullo</span>
        </p>
      </div>
    </Modal>
  ) )
  .add( 'Hidden', () => (
    <Modal show={false} hider={action( 'hide' )}>
      <div>
        <p>Hullo</p>
        <p>Hullo</p>
        <p>Hullo</p>
        <p>Hullo</p>
      </div>
    </Modal>
  ) );
