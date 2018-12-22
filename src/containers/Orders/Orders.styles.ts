import styled from '@emotion/styled/macro';
export const StyledOrders = styled.div`
  & {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 10px 0;
  }
  .OrderBox {
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.658);
    margin: 15px;
    border-radius: 20px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    min-height: 65vh;
  }
  .OrderWrapper {
    flex: 0.3 0.2 100%;
  }

  @media (min-width: 650px) {
    .OrderBox {
      max-width: 600px;
    }
  }
`;
