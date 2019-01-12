import * as React from 'react';
import { IInputConfig } from './types';
import Input from './Input';

export const mapToInputs = (onChange: React.ChangeEventHandler) => (
  obj: IInputConfig,
  _index: number,
  _array: IInputConfig[],
) => {
  return <Input {...obj} key={obj.id} onChange={onChange} />;
};
