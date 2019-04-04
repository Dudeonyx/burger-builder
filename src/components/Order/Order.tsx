import styled from '@emotion/styled/macro';
import React, { FunctionComponent, useMemo } from 'react';
import { INGREDIENT_PRICES } from '../../shared/getTotalPrice';
import { Iingredients, IingredientsKeys } from '../../types/ingredients';
// import styled from 'styled-components/macro';
// tslint:disable-next-line:no-unused-expression
// jsx;
const StyledOrder = styled.div`
  & {
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.658);
    margin: 15px;
    border-radius: 10px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  .Breakdown {
    text-transform: capitalize;
    flex: 0.4 0.02 42%;
    margin: 5px 5px;
    padding: 1px;
    border: 1px solid rgba(0, 0, 0, 0.226);
    border-radius: 10px;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.459);
    background-color: rgba(169, 169, 169, 0.13);
  }
  h4,
  h5 {
    flex: 1 1 100%;
  }
  p {
    flex: 1 1 100%;
    margin: 5px 0;

    @media (min-width: 500px) {
      .Breakdown {
        flex: 0.4 0.02 4.95rem;
      }
    }
  }
`;
interface OrdersProps {
  ingredients: Iingredients;
  name: string;
  totalPrice: string;
  id: string;
}

const Order: FunctionComponent<OrdersProps> = ({ ingredients, totalPrice, name, id }) => {
  const breakdown = useMemo(
    () =>
      (Object.entries(ingredients) as Array<[IingredientsKeys, number]>).map(([igKey, igVal]) => (
        <span className="Breakdown" key={id + igKey + igVal}>
          {igKey} - {igVal}
          <br />
          {igVal * INGREDIENT_PRICES[igKey] > 0 ? (
            <>${(igVal * INGREDIENT_PRICES[igKey]).toFixed(2)}</>
          ) : (
            <>N/A</>
          )}
        </span>
      )),
    [ingredients, id],
  );
  return (
    <StyledOrder>
      <h4>{`Name: ${name}`}</h4>
      {breakdown}
      <p>Base Cost: ${INGREDIENT_PRICES.base.toFixed(2)}</p>
      <h5>Total Cost: ${totalPrice}</h5>
    </StyledOrder>
  );
};

export default Order;
