import React from 'react';

const jsx2dArrayFromObject = ( inputObject, GivenComponent, propName ) => {
  return Object.entries( inputObject ).map( ( [igKey, igVal] ) => {
    return [...Array( igVal )].map( ( _, i ) => {
      const myprops = {
        [propName]: igKey,
      };
      return <GivenComponent {...myprops} key={igKey + ( i + 1 )} />;
    } );
  } );
};
export default jsx2dArrayFromObject;
