import React from "react";
import styles from "./Pagination.module.css"

function Pagination({ handleClick, pageNo, loading }) {
  return (
    <div className={styles.container} >
            {(pageNo !== 0) ? (<button onClick={() => handleClick(false)} className={ styles.button }>Prev</button>): ""}
           
          <button onClick={() => handleClick(true)} className={ styles.button }>Next</button>
    </div>
  );
}

export default Pagination;
