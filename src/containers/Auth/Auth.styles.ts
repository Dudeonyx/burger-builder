import styled from '@emotion/styled/macro';
import { boxStyle } from '../Orders/Orders.styles';
import css from '@emotion/css/macro';
const flexColumn = css`
  display: flex;
  flex-flow: column;
`;
const flexColumnCenter = css`
  ${flexColumn};
  justify-content: center;
  align-items: center;
`;
export const StyledAuth = styled.div`
  ${flexColumnCenter}
  & > div {
    ${boxStyle};
    min-height: 0px;
    p.info {
      font-variant: small-caps;
      font-weight: 700;
      color: #476918bf;
      text-shadow: 1px 1px 1px darkgreen;
      font-size: 1.1rem;
    }
    p.error {
      flex: 1 1 100%;
      text-align: center;
      font-variant: small-caps;
      font-weight: 700;
      color: crimson;
      text-shadow: 1px 1px 1px orange;
      font-size: 1.1rem;
    }
  }
  form {
    width: 90%;
    ${flexColumn};
    button {
      align-self: center;
    }
    @media (min-width: 650px) {
      width: 550px;
    }
  }
`;
