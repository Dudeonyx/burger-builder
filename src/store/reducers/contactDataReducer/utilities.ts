import { IContactDataReducerState, IContactDataReducerActions } from './types';

export const updateform = (
  draft: IContactDataReducerState,
  action: IContactDataReducerActions,
) => {
  if (action.type === 'UPDATE_CONTACT_FORM') {
    const { set, name, value } = action.payload;
    if (!(set in draft.customer)) {
      // tslint:disable-next-line:no-console
      console.error(`${set} not found in Form.customer`);
      return;
    }
    if (!(name in draft.customer[set])) {
      // tslint:disable-next-line:no-console
      console.error(`${name} not found in ${set}`);
      return;
    }
    (draft.customer as any)[set][name].value = value;
    if (name === 'deliveryMethod') {
      draft.customer.deliveryMethod.deliveryMethod.options.forEach(obj => {
        obj.value === value ? (obj.checked = true) : (obj.checked = false);
      });
    }
  }
};
