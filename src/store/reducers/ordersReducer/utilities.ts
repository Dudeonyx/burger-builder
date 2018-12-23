import { ISET_ORDERS, IformattedOrder, IDbOrders } from './types';

export function formatOrders(action: ISET_ORDERS) {
  type T = string;
  const formattedOrders: IformattedOrder[] = (Object.entries(
    action.payload.orders,
  ) as Array<[T, IDbOrders[T]]>)
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
