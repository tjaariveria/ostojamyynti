import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [kayttajat, setKayttajat] = useState([]);

  useEffect(() => {
    fetch("/kayttajat")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setKayttajat(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <ul>
        {kayttajat.map((kayttaja) => (
          <li key={kayttaja.id}>
            <h1>{kayttaja.kayttaja_tunnus}</h1> - <h3>{kayttaja.kayttaja_taso}</h3> <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;