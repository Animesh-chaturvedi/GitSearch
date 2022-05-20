import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { fetchRepos } from "../../redux";
import ReposList from "../ReposList";
import GithubLogo from "../../assets/githubLogo.png";
import styles from "./searchBar.module.css";
import { useEffect } from "react";

function SearchBar(props) {
  const { fetch, Text, pageNo } = props;
  const inputRef = useRef();
  const throttling = useRef(false);
  const [first, setFirst] = useState(false);
  const handleThrottleSearch = () => {
    if (throttling.current) {
      return;
    }
    // If there is no search term, do not make API call

    if (!inputRef.current.value.trim()) {
      return;
    }
    throttling.current = true;
    setTimeout(() => {
      throttling.current = false;
      // if (!inputRef.current.value.trim()) {
      //   return;
      // }
      fetch(inputRef.current.value, pageNo);
    }, 1500);
  };

  useEffect(() => {
    first
      ? fetch(inputRef.current.value, pageNo)
      : setFirst(true);
  }, [pageNo]);

  return (
    <div className={styles.container}>
      <img src={GithubLogo} alt="github logo" className={styles.gitIcon} />
      <div className={styles.headerText}>Search {Text} Repos</div>
      <input
        type="text"
        ref={inputRef}
        onChange={handleThrottleSearch}
        className={styles.searchInput}
        placeholder="Find repo..."
      />
    </div>
  );
}

export default SearchBar;
