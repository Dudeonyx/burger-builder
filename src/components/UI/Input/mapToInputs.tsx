import React from 'react';
import { InputConfig } from './types';
import Input from './Input';

export const makeMapToInputs = (onChange: React.ChangeEventHandler) => (
  obj: InputConfig,
  _index: number,
  _array: InputConfig[],
) => {
  return <Input {...obj} key={obj.id} onChange={onChange} />;
};
