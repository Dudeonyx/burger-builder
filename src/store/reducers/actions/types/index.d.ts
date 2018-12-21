import {
  mapIngredientsStateToProps,
  mapIngredientsDispatchToProps,
} from '../actionCreators';

export interface IingActionTypes {
  readonly INCREASE_INGREDIENT: 'INCREASE_INGREDIENT';
  readonly DECREASE_INGREDIENT: 'DECREASE_INGREDIENT';
  readonly SET_INGREDIENTS: 'SET_INGREDIENTS';
}

// export type IconnectIngredientsProps<
//   T,
//   D extends Partial<
//     ReturnType<typeof mapIngredientsDispatchToProps>
//   > | null = null
// > = (D extends null ? ReturnType<typeof mapIngredientsDispatchToProps> : D) &
//   ReturnType<typeof mapIngredientsStateToProps> &
//   T;

export interface IcontactDataReducerActionTypes {
  UPDATE_CONTACT_FORM: 'UPDATE_CONTACT_FORM';
  RESET_CONTACT_FORM: 'RESET_CONTACT_FORM';
}
