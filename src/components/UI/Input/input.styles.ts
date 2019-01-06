import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
const invalidCss = css`
  border: 1px solid red;
  background-color: #fda49a;
`;
const validMark = css`
  content: "✓";
  position: absolute;
  color: #26b72b;
`;
const inValidMark = css`
  content: "✖";
  position: absolute;
  color: #f00;
`;
const showValidMark = ({ valid }: { valid: boolean }) => {
  return valid ? validMark : inValidMark;
};
const validInput = ({ valid }: { valid: boolean }) => {
  return valid ? null : invalidCss;
};

export const StyledInput = styled.div`
  &&&&&& {
    margin: 5px;
    margin-top: 0.9rem;
    display: flex;
    position: relative;
  }
  *::before,
  *::after,
  * {
    box-sizing: border-box;
  }
  label.txtLbl {
    font-size: 0.7rem;
    position: absolute;
    top: -0.8rem;
    left: 0.4rem;
    color: ${({ valid }) => (valid ? '#228c1d' : 'red')};
    font-weight: 700;
  }
  label.radio {
    display: flex;
    justify-content: center;
  }
  span {
    flex: 2 1 5em;
    align-self: center;
    text-align: left;
    padding-left: 1em;
  }
  input + i::after {
    padding: 6px;
    margin-left: -25px;
    ${showValidMark};
  }
  input {
    flex: 10 1 auto;
    background-color: rgba(255, 255, 255, 0.74);
    vertical-align: center;
    border-radius: 10px;
    line-height: 0.5em;
    padding: 4px;
    outline: none;
    ${validInput};
  }
  input:focus {
    background-color: rgb(255, 255, 255);
    border: 2px solid rgb(255, 166, 0);
  }
  .radio input {
    flex: 0;
    vertical-align: unset;
    border-radius: unset;
  }
  @media (max-width: 400px) {
    font-size: 0.85em;
  }
`;
