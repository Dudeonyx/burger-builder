import { ISET_ORDERS, IformattedOrder, IDbOrders } from './types';

export function formatOrders(orders: IDbOrders | null) {
  if (!orders) {
    return [];
  }
  type T = string;
  const formattedOrders: IformattedOrder[] = (Object.entries(orders) as Array<
    [T, IDbOrders[T]]
  >)
    .reverse()
    .slice()
    .map(([id, { basicInfo: { name }, ingredients, price: totalPrice },]) => {
      return {
        id,
        name,
        ingredients,
        totalPrice,
      };
    });
  return formattedOrders;
}

export function generateErrorMessage(
  error: (Error & { [x: string]: any }) | null,
) {
  if (!error) {
    return '';
  }
  let defaultMessage: string;
  if (error.response) {
    if (error.response.data.error.message) {
      defaultMessage = error.response.data.error.message;
    } else {
      defaultMessage = error.response.data.error;
    }
  } else {
    defaultMessage = error.message;
  }
  switch (defaultMessage) {
    case 'Permission denied':
      return 'You are not logged in!';
    case 'Network Error':
      return 'A Network Error has Ocurred, please refresh the page';
    case 'Request failed with status code 401':
      return 'A Network Error has Ocurred, please refresh the page';
    default:
      return defaultMessage;
  }
}
