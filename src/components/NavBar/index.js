import React from "react";
import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";
function NavBar() {
    const location = useLocation()
    const { pathname } = location
    
  return (
    <div className={styles.container}>
      <Link to="/" className={`${styles.linkTab} ${ pathname ==="/" ? styles.tabActive :""}`}>Home</Link>
      <Link to="/favourites" className={`${styles.linkTab} ${ pathname === "/favourites" && styles.tabActive}`}>Favourites</Link>
    </div>
  );
}

export default NavBar;
