export interface IingActionTypes {
  INCREASE_INGREDIENT: 'INCREASE_INGREDIENT';
  DECREASE_INGREDIENT: 'DECREASE_INGREDIENT';
  SET_INGREDIENTS: 'SET_INGREDIENTS';
  SET_ERROR: 'SET_ERROR';
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
