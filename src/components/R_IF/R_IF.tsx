import { ReactChild } from "react";

interface ReactIfProps {
  if: boolean;
  then: ReactChild;
  else?: ReactChild;
}

const ReactIf: React.FC<ReactIfProps> = ({
  if: condition,
  then,
  else: fallback = null,
}) => <>{condition ? then : fallback}</>;

export default ReactIf;
