import React, { useState, useEffect } from "react";
import Axios from "axios";

import "../styles/party.css";

function Party() {
  const [parties, setParties] = useState([]);

  const getParties = async () => {
    await Axios.get("http://localhost:1111/getparties").then((response) => {
      setParties(response.data);
    });
    console.log(parties);
  };
  useEffect(() => {
    getParties();
  }, []);
  return (
    <div class="party_container">
      <h1> Votes Per Party</h1>

      <table className="rwd-table">
        <tr>
          <th>Party</th>
          <th>Current Votes</th>
        </tr>
        {parties.map((val, key) => {
          return (
            <tr>
              <td data-th="Party_Name">{val.Name}</td>
              <td data-th="Votes">{val.Votes}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Party;
