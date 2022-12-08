import styles from "../styles/Home.module.css";

export default function Signal({ status }) {
  console.log("====================================");
  console.log(status);
  console.log("====================================");
  if (status) {
    return (
      <>
        <div id={styles.center_div}>
          <div className={styles.bubble_true}>
            <span className={styles.bubble_outer_dot_true}>
              <span className={styles.bubble_inner_dot_true}></span>
            </span>
          </div>
        </div>
      </>
    );
  } else if (!status) {
    return (
      <>
        <div id={styles.center_div}>
          <div className={styles.bubble}>
            <span className={styles.bubble_outer_dot}>
              <span className={styles.bubble_inner_dot}></span>
            </span>
          </div>
        </div>
      </>
    );
  }
}
