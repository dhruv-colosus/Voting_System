import React, { useState, useEffect } from "react";
import "../styles/voters.css";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";

function Voters() {
  const [showres, setShowres] = useState();
  const [parties, setParties] = useState([]);
  const history = useHistory();

  const [selected, setSelected] = useState("");
  const [refee, setRefee] = useState(0);
  const getParties = async () => {
    await Axios.get("http://localhost:1111/getparties").then((response) => {
      setParties(response.data);
    });
    console.log(parties);
  };
  useEffect(() => {
    getParties();
    Axios.post("http://localhost:1111/check", {
      username: localStorage.getItem("username_sqll"),
    }).then((response) => {
      if (response.data[0].VoteDone === 1) {
        setShowres(1);
      }
    });
  }, [refee]);

  const FinalVote = () => {
    Axios.post("http://localhost:1111/votes", {
      party: selected,
    });

    Axios.post("http://localhost:1111/votes2", {
      username: localStorage.getItem("username_sqll"),
    }).then((response) => {
      setRefee(1);
    });
  };

  const FinalVote1 = (e) => {
    e.preventDefault();

    console.log(selected);
  };

  const logOut = () => {
    localStorage.removeItem("username_sqll");
    history.push("/");
  };

  return (
    <div className="vote_container">
      {showres ? (
        <>
          <Link to="/party">
            <button className="mar-topp">Show Current Results</button>
          </Link>
        </>
      ) : (
        ""
      )}
      {showres ? (
        <>
          <h1>You Have Already Voted </h1>
        </>
      ) : (
        <h1>Vote For Your Favourite Party </h1>
      )}

      <form>
        <ul>
          {parties.map((val, key) => {
            return (
              <li>
                <input
                  type="radio"
                  id={`${val.Name}`}
                  name="haha"
                  onClick={(e) => {
                    setSelected(val.Name);
                  }}
                />
                <label htmlFor={`${val.Name}`}>{val.Name}</label>

                <div className="check">
                  <div className="inside"></div>
                </div>
              </li>
            );
          })}
        </ul>
        {!showres ? (
          <>
            <button onClick={FinalVote}>Submit</button>
          </>
        ) : (
          ""
        )}
      </form>
      <button className="hello1" onClick={logOut}>
        LogOut
      </button>
    </div>
  );
}

export default Voters;
