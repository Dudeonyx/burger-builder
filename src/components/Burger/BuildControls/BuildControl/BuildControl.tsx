import React, { FunctionComponent, MouseEventHandler } from 'react';
import styled from '@emotion/styled/macro';


const StyledBuildControl = styled.div`
& {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2px 0;
    --width: 50px
}

& button {
    display: block;
    font: inherit;
    padding: 5px;
    margin: 0 5px;
    border: 1px solid #AA6817;
    cursor: pointer;
    outline: none;
    width: var(--width);
}

& button:disabled {
    background-color: #AC9980;
    border: 1px solid #7E7365;
    color: #ccc;
    cursor: default;
}

& button:hover:disabled {
    background-color: #AC9980;
    color: #ccc;
    cursor: not-allowed;
}

.Label {
    padding: 10px;
    font-weight: bold;
    width: var(--width);
}

& .Less {  
    background-color: #D39952;
    color: white;
}

& .More {
    background-color: #8F5E1E;
    color: white;
}

& .Less:hover, & .Less:active {  
    background-color: #DAA972;
    color: white;
}

& .More:hover,& .More:active {
    background-color: #99703F;
    color: white;
}
@media (min-width: 320px) {
    .Label, & button {
        width: 80px;
    }
}
`

export interface IBuildControlProps {
  removed: MouseEventHandler;
  disabled: boolean;
  label: string;
  added: MouseEventHandler;
}
const BuildControl: FunctionComponent<IBuildControlProps> = ({
  added,
  disabled,
  label,
  removed,
}) => {
  return (
    <StyledBuildControl>
      <div className="Label">{label}</div>
      <button onClick={removed} className="Less" disabled={disabled}>
        Less
      </button>
      <button onClick={added} className="More">
        More
      </button>
    </StyledBuildControl>
  );
};

export default BuildControl;
