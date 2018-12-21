import { RouteComponentProps } from 'react-router-dom';
import { Iingredients } from '../../../../types/ingredients';
import { TConnectContactDataProps } from '../../../../store/reducers/actions/actionCreators';

export type IContactDataProps = RouteComponentProps & TConnectContactDataProps;
export interface IContactDataState {
  loading: boolean;
}
