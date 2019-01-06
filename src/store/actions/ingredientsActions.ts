import { Dispatch } from 'redux';
import { Iingredients } from '../../types/ingredients';
import axios from '../../axios-orders';
import { ingredientActions } from '../reducers/ingredientReducer/ingredientReducer';

export const {
  setIngredients,
  decreaseIngredient,
  increaseIngredient,
  setIngredientsError,
} = ingredientActions;
export const fetchIngredientsHandler = (): Promise<VoidFunction> => {
  return (async (dispatch: Dispatch) => {
    // this.setState({ error: null });
    dispatch(setIngredientsError(false));
    try {
      const response = await axios.get<Iingredients>('/ingredients.json');
      const { data: newIngredients } = response;
      dispatch(setIngredients(newIngredients));
    } catch (error) {
      dispatch(setIngredientsError(true));
    }
  }) as any;
};
