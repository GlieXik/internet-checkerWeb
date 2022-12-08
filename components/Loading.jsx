import styles from "../styles/Loading.module.css";
import { ThreeCircles } from "react-loader-spinner";

const Loading = () => {
  return (
    <>
      <div className={styles.loading_container}>
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
      </div>
    </>
  );
};

export default Loading;
