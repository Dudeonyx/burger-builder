import { MouseEventHandler } from 'react';
import { IingredientsKeys, Iingredients } from '../../../../types/ingredients';
export interface IbuildControlsProps {
  ingredients: Iingredients;
  price: string;
  increase: (e: IingredientsKeys) => void;
  decrease: (e: IingredientsKeys) => void;
  purchaseStart: MouseEventHandler;
  purchaseable: boolean;
  // isAuth: boolean;
}
export type TdisabledCheck = { [x in IingredientsKeys]: boolean };
export type Tcontrols = Array<{
  label: string;
  type: IingredientsKeys;
}>;
