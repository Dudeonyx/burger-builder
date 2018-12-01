import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Loader from '../components/UI/Loader/Loader';
import Logo from '../components/UI/Logo/Logo';

storiesOf( 'Welcome', module ).add( 'to Storybook', () => (
  <Welcome showApp={linkTo( 'Button' )} />
) );

storiesOf( 'Button', module )
  .add( 'with text', () => (
    <Button onClick={action( 'clicked' )}>Hello Button</Button>
  ) )
  .add( 'with some emoji', () => (
    <Button onClick={action( 'clicked' )}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ) );

storiesOf( 'Loader', module ).add( 'Default', () => <Loader /> );

storiesOf( 'Logo', module )
  .add( 'Logo', () => <Logo link="##" /> )
  .add( 'height: 11%', () => <Logo height="11%" link="##" /> )
  .add( 'height: 50%', () => <Logo height="50%" link="##" /> )
  .add( 'HQ', () => <Logo link="##" /> )
  .add( 'HQ height: 11%', () => <Logo height="11%" link="##" /> )
  .add( 'HQ height: 50%', () => <Logo height="50%" link="##" /> );
