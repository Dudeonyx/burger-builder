import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';

const $404: FunctionComponent<RouteComponentProps> = props => {
  return (
    <div style={{ fontSize: '3rem' }}>
      {'404 Error \n.' + props.location.pathname + ' not found.'}
    </div>
  );
};

export default $404;
