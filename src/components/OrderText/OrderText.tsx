import { FunctionComponent } from "react";
import styled from "@emotion/styled/macro";
import { IOrderTextProps } from "./types";

const StyledOrderText = styled.div`
  text-align: center;

  div {
    display: flex;
    flex-flow: column;
    align-items: center;
    /* max-width: 10em;
  margin: 0 auto; */
  }

  ul {
    text-align: left;
    /* min-width: 10em; */
  }
`;

/**
 * Component that displays the individual ingredient costs
 * and total cost.
 * @implements IOrderTextProps
 */
const OrderText: FunctionComponent<IOrderTextProps> = ({
  ingredients,
  totalCost,
  totalCostPrefix,
  title,
}) => {
  const summary = Object.entries(ingredients).map(([igKey, igVal]) => (
    <li style={{ textTransform: "capitalize" }} key={igKey}>
      <span style={{ display: "inline-block", minWidth: "3.7em" }}>
        {igKey}:
      </span>
      {` ${igVal}`}
    </li>
  ));
  return (
    <StyledOrderText>
      {title ? <h3 style={{ fontWeight: "bold" }}>{title}</h3> : null}
      <div>
        <ul>{summary}</ul>
      </div>
      {totalCostPrefix ? (
        <p style={{ fontWeight: "bold" }}>
          {totalCostPrefix} ${totalCost}
        </p>
      ) : null}
    </StyledOrderText>
  );
};

export default OrderText;
