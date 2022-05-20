import React from "react";
import styles from "./repoList.module.css";
import StarIcon from "../../assets/StarIcon.png";

function ReposList(props) {
  const { buttonFunc, list, fav } = props;
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = (dateUpt) => {
    let date1 = new Date();
    let date2 = new Date(dateUpt);
    let difference = date1.getTime() - date2.getTime();
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24));

    if (totalDays < 31) {
      return (
        "  Updated " + `${totalDays} ${totalDays === 1 ? "day" : "days"} ago`
      );
    } else if (365 > totalDays) {
      return `  Updated on ${months[date2.getMonth()].slice(
        0,
        3
      )}  ${date2.getDate()}`;
    } else {
      return `  Updated on ${months[date2.getMonth()].slice(
        0,
        3
      )}  ${date2.getDate()}, ${date2.getFullYear()}`;
    }
  };

  return (
    <div>
      <ul className={styles.listContainer} style={list.length > 0 ? {borderTop: "2px solid #21262d"} : { border:"none"}}>
        {list &&
          list.length !== 0 &&
          list.map((repo) => (
            <li key={repo.id} className={styles.repoContainer}>
              <div className={styles.cont1}>
                <div style={{ display: "flex", paddingBottom: ".5rem" }}>
                  <a className={styles.link} href={repo.html_url}>
                    {repo.name}
                  </a>
                  <div>
                    <div className={styles.tag}>
                      {repo.private ? "Pivate" : "Public"}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "1rem",
                    alignContent: "center",
                  }}
                >
                  <div>
                    <img
                      src={repo.owner.avatar_url}
                      className={styles.avatar}
                    />
                  </div>
                  <div>{repo.owner.login}</div>
                </div>
                <div className={styles.description}> {repo.description}</div>
                <div className={styles.dateCont}>
                  <div>{repo.language} </div>
                  <div>{days(repo.updated_at)}</div>
                </div>
              </div>
              <div className={styles.starContainer}>
                <div>
                  {repo.stargazers_count}{" "}
                  <img src={StarIcon} className={styles.starIcon} />
                </div>
                <button
                  className={styles.FavButton}
                  onClick={() => buttonFunc(repo)}
                >
                  {fav ? "Remove" : "Add to Favourites"}
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default ReposList;
