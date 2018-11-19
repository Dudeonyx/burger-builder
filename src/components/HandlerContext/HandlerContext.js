import React from 'react';

const HandlerContext = React.createContext( {
  increaseHandler: () => {},
  decreaseHandler: () => {},
} );

export default HandlerContext;
