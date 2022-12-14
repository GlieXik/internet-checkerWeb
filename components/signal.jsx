import styles from "../styles/Home.module.css";

function Signal({ status }) {
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
export default Signal;
