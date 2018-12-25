import * as React from 'react';
import { IInputConfig } from './types';
import Input from './Input';

const mapToInputs = (onChange: React.ChangeEventHandler) => (
  obj: IInputConfig,
  _index: number,
  _array: IInputConfig[],
) => {
  return <Input {...obj} key={obj.id} onChange={onChange} />;
};

export default mapToInputs;
