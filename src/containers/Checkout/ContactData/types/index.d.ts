import { RouteComponentProps } from 'react-router-dom';
import { Iingredients } from '../../../../types/ingredients';
import { connectContactDataProps } from '../../../../store/reducers/contactDataReducer/actions';

export type IContactDataProps = RouteComponentProps & connectContactDataProps;
export interface IContactDataState {
  loading: boolean;
}
