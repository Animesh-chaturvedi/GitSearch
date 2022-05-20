import React, { useRef } from "react";
import { connect } from "react-redux";
import { fetchRepos } from "../../redux";
import ReposList from "../ReposList";
import GithubLogo from "../../assets/githubLogo.png";
import styles from "./searchBar.module.css";

function SearchBar(props) {
  const { fetch, Text } = props;
  const inputRef = useRef();
  const throttling = useRef(false);
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
      fetch(inputRef.current.value);
    }, 2000);
  };

  

  return (
    <div className={styles.container}>
        <img
          src={GithubLogo}
          alt="github logo"
          className={styles.gitIcon}
        />
        <div className={styles.headerText} >Search {Text} Repos</div>
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

const mapStateToProps = (state) => {
  return {
    repos: state.repo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRepos: (searchTerm) => dispatch(fetchRepos(searchTerm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
