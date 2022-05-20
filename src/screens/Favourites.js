import React, { useState, useRef } from "react";
import SearchBar from "../components/SearchBar";
import { connect } from "react-redux";
import { fetchRepos, addFav, removeFav, addMany } from "../redux";
import { useEffect } from "react";
import ReposList from "../components/ReposList";

function Favourites(props) {
  const { repoObj, fetchRepos, addFav, favRepObj, removeFav } = props;
  const { favRepos } = favRepObj;
  const [list, setList] = useState([]);
  const inputFile = useRef(null);

  const filterFav = (term) => {
    if (term.length === 0) {
      setList(favRepos);
    } else {
      let filterArray = favRepos.filter(
        (element) =>
          element.description.toLowerCase().indexOf(term.toLowerCase()) !==
            -1 || element.name.toLowerCase().indexOf(term.toLowerCase()) !== -1
      );
      setList(filterArray);
    }
  };

  const onImport = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const onInputFile = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    let file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = onReaderLoad;
    fileReader.readAsText(e.target.files[0]);
  };

  const onReaderLoad = (e) => {
    let obj = JSON.parse(e.target.result);
    obj.map((el) => {
      if (
        favRepos.find((fav) => {
          return el.id === fav.id;
        })
      ) {
        console.log("already in favourites");
      } else {
        addFav(el);
        localStorage.setItem(
          "favRepos",
          JSON.stringify(
            localStorage.favRepos && localStorage.favRepos.length !== 0
              ? JSON.parse(localStorage.favRepos).concat(el)
              : el
          )
        );
      }
    });
  };

  const removeFavRepo = async (repo) => {
    const index = favRepos.findIndex((el) => el.id === repo.id);
    await removeFav(index);
    localStorage.setItem("favRepos", JSON.stringify(favRepos));
  };

  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportList = (e) => {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(favRepos),
      fileName: "Fav_Repos.json",
      fileType: "text/json",
    });
  };

  useEffect(() => {
    setList(favRepos);
  }, []);

  var styles = {
    button: {
      margin: "0rem 0rem 0rem 2rem",
      backgroundColor: "#238636",
      color: "#ffffff",
      fontSize: "1rem",
      border: "none",
      padding: "0.8rem 1.2rem",
      borderRadius: "8px",
    },
  };

  return (
    <div>
      <SearchBar fetch={filterFav} Text="Favourite" />
      <div style={{display:"flex", justifyContent:"flex-end"}}>
        <button onClick={exportList} style={styles.button}>
          Export All
        </button>
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
          accept=".json"
          onChange={onInputFile}
        />
        <button onClick={onImport} style={styles.button}>
          Import JSON
        </button>
      </div>
      <ReposList list={list} buttonFunc={removeFavRepo} fav={true} />
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
    removeFav: (index) => dispatch(removeFav(index)),
    addFav: (repo) => dispatch(addFav(repo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
