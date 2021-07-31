import { MouseEventHandler, ReactNode, SFC } from "react";

const retryStyle = {
  borderBottom: "1px solid lightblue",
  color: "lightblue",
  cursor: "pointer",
};

export interface IRetryProps {
  retryHandler: MouseEventHandler;
  mainMessage?: ReactNode;
  additionalMessage?: ReactNode;
  additionalInfo?: ReactNode;
}

const Retry: SFC<IRetryProps> = ({
  retryHandler,
  additionalInfo,
  mainMessage,
  additionalMessage,
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h3 style={{ textAlign: "center", textTransform: "capitalize" }}>
        {mainMessage ? mainMessage : `An Error Has Occured, Please `}
        <span onClick={retryHandler} style={retryStyle}>
          {"Retry"}
        </span>
        .<br />
        {additionalMessage ? additionalMessage : null}
      </h3>
      {additionalInfo ? (
        <div style={{ textAlign: "center" }}>
          <h4>Additional Error Info</h4>
          <p>{additionalInfo}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Retry;
