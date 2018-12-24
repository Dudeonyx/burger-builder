import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
const invalid = css`
  border: 1px solid red;
  background-color: #fda49a;
`;
export const StyledInput = styled.div`
  margin: 5px;
  *::before,
  *::after,
  * {
    box-sizing: border-box;
  }
  label {
    display: flex;
    justify-content: space-between;
  }
  label.radio {
    justify-content: center;
  }
  span {
    flex: 2 1 5em;
    align-self: center;
    text-align: left;
    padding-left: 1em;
  }
  input {
    flex: 10 1 auto;
    background-color: rgba(255, 255, 255, 0.74);
    border-radius: 10px;
    padding: 4px;
    outline: none;
    ${({ valid }: { valid: boolean }) => (valid ? null : invalid)}
  }
  .radio input {
    flex: 0;
  }
  input:focus {
    background-color: rgb(255, 255, 255);
    border: 2px solid rgb(255, 166, 0);
  }
  @media (max-width: 400px) {
    font-size: 0.85em;
  }
`;
