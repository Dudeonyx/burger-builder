import React, { useEffect } from 'react';
import styled from '@emotion/styled/macro';

const List = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`;
interface SwipeableListProps {}

const SwipeableList: React.FC<SwipeableListProps> = ({ children }) => {
  // const [state, setState] = useState();

  useEffect(() => {});

  return (
    <>
      <List>{children}</List>
    </>
  );
};

export default SwipeableList;
