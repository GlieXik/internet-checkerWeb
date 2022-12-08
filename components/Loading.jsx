import styles from "../styles/Loading.module.css";
import { LoopCircleLoading } from "react-loadingg";

const Loading = () => {
  return (
    <>
      <div className={styles.loading_container}>
        <LoopCircleLoading />
      </div>
    </>
  );
};

export default Loading;
