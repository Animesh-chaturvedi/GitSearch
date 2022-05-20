import React from "react";
import SearchBar from "../components/SearchBar";
import { connect } from "react-redux";
import { fetchRepos, addFav } from "../redux";
import ReposList from "../components/ReposList";
import { Link } from "react-router-dom";
function Home(props) {
  const { fetchRepos, repoObj, addFav, favRepObj } = props;
  const { loading, error, repos } = repoObj;
  const { favRepos } = favRepObj;

  const addNewFav = (repo) => {
    let newFav = {
      id: repo.id,
      html_url: repo.html_url,
      name: repo.name,
      private: repo.private,
      owner: {
        avatar_url: repo.owner.avatar_url,
        login: repo.owner.login,
      },
      description: repo.description,
      language: repo.language,
      updated_at: repo.updated_at,
      stargazers_count: repo.stargazers_count,
    };
    let found = favRepos.some((el) => el.id === repo.id);
    if (!found) {
      addFav(newFav);
      localStorage.setItem(
        "favRepos",
        JSON.stringify((localStorage.favRepos && localStorage.favRepos.length !== 0) ? JSON.parse(localStorage.favRepos).concat(newFav): newFav)
      );
    } else {
      alert("Already in favourites");
    }
  };

 

  return (
    <div>
      <SearchBar fetch={fetchRepos} Text="Github" fav={false} />
      {loading ? (
        "Loading..."
      ) : (
        <ReposList list={repos} buttonFunc={addNewFav} fav={false} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    repoObj: state.repo,
    favRepObj: state.fav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRepos: (searchTerm) => dispatch(fetchRepos(searchTerm)),
    addFav: (newFav) => dispatch(addFav(newFav)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
