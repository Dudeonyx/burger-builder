import { IformattedOrder, IDbOrders } from './types';

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
