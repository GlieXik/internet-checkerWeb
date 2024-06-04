import { ThreeCircles } from "react-loader-spinner";

export const Loader = () => {
  return (
    <>
      <ThreeCircles
        height="100"
        width="100"
        color="#35F3F0"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#4f1"
        innerCircleColor="#F34A35"
        middleCircleColor=""
      />
    </>
  );
};
