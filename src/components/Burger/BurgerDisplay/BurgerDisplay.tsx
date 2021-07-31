import { ComponentType, FunctionComponent, memo, ReactElement } from "react";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import { Iingredients } from "../../../types/ingredients";
import styled from "@emotion/styled/macro";

const jsxArrayFromObject = <
  Cln extends string,
  O extends Partial<Record<Cln, number>>
>(
  GivenComponent: ComponentType<{ className: Cln }>,
  inputObject: O
): Array<ReactElement<{ className: Cln }>> => {
  return (Object.entries(inputObject) as Array<[Cln, number]>).flatMap(
    ([igKey, igVal]) => {
      return [...Array(igVal)].map((_, i) => {
        return <GivenComponent className={igKey} key={igKey + (i + 1)} />;
      });
    }
  );
};

export interface IburgerDisplay {
  ingredients: Iingredients;
}
const burgerDisplay: FunctionComponent<IburgerDisplay> = (props) => {
  let allIngredients = jsxArrayFromObject(
    BurgerIngredient as any,
    props.ingredients as any
  );
  if (allIngredients.length === 0) {
    allIngredients = (<p>Please start adding ingredients</p>) as any;
  }
  return (
    <StyledBurgerDisplay>
      <BurgerIngredient className="bread-top">
        <div className="seeds1" />
        <div className="seeds2" />
      </BurgerIngredient>
      {allIngredients}
      <BurgerIngredient className="bread-bottom" />
    </StyledBurgerDisplay>
  );
};

export default memo(burgerDisplay);

const StyledBurgerDisplay = styled.div`
  & {
    height: 250px;
    width: 100%;
    font-weight: bold;
    font-size: 1.2rem;
    margin: auto;
    overflow: auto;
    text-align: center;
  }

  @media (min-width: 360px) and (min-height: 400px) {
    & {
      height: 310px;
      width: 350px;
    }
  }

  @media (min-width: 500px) and (min-height: 401px) {
    & {
      height: 310px;
      width: 330px;
    }
  }
  @media (min-width: 500px) and (max-height: 400px) {
    & {
      height: 310px;
      width: 350px;
    }
  }
  @media (min-width: 1000px) and (min-height: 600px) {
    & {
      height: 400px;
      width: 420px;
    }
  }
  @media (min-width: 700px) and (min-height: 900px) {
    & {
      height: 700px;
      width: 680px;
    }
  }
`;
