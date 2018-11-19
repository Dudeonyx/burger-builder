import React from 'react';

const jsxArrayFromObject = ( inputObject, GivenComponent, propName ) => {
  return Object.entries( inputObject )
    .map( ( [igKey, igVal] ) => {
      return [...Array( igVal )].map( ( _, i ) => {
        const myprops = {
          [propName]: igKey,
        };
        return <GivenComponent {...myprops} key={igKey + ( i + 1 )} />;
      } );
    } )
    .reduce( ( arr, subArr ) => [...arr, ...subArr], [] );
};
export default jsxArrayFromObject;
