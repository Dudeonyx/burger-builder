import React from "react";

const HandlerContext = React.createContext({
  increaseHandler: () => undefined,
  decreaseHandler: () => undefined,
});

export default HandlerContext;
