import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [kayttajat, setKayttajat] = useState([]);
  const [ilmoitukset, setIlmoitukset] = useState([]);

  const haeKayttajat = () => {
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
  };

  const haeIlmoitukset = () => {
    fetch("/ilmoitukset")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIlmoitukset(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    haeKayttajat();
    haeIlmoitukset();
  }, []);

  return (
    <div className="App">
      <ul>
        {kayttajat.map((kayttaja) => (
          <li key={kayttaja.kayttaja_id}>
            <h1>{kayttaja.kayttaja_tunnus}</h1> -{" "}
            <h3>{kayttaja.kayttaja_taso}</h3> <br />
            {ilmoitukset.map((ilmoitus) => ( kayttaja.kayttaja_id === ilmoitus.ilmoittaja_id ?
              <li key={ilmoitus.id}>
                <h1>{ilmoitus.ilmoitus_nimi}</h1>
                <h3>{ilmoitus.ilmoitus_kuvaus}</h3>
              </li> :
              <h1>Ei ilmoituksia</h1>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
