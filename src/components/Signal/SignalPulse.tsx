export const SignalPulse = ({ status }: { status: boolean }) => {
  if (status) {
    return (
      <>
        <div className="bubble_true">
          <span className={"bubble_outer_dot_true"}>
            <span className={"bubble_inner_dot_true"}></span>
          </span>
        </div>
      </>
    );
  } else if (!status) {
    return (
      <>
        <div className={"bubble"}>
          <span className={"bubble_outer_dot"}>
            <span className={"bubble_inner_dot"}></span>
          </span>
        </div>
      </>
    );
  }
};
