import React, { useState, useEffect } from "react";
import DataService from "./services/Services";
// import axios from "axios";

const Listaa = () => {
  const [kayttajat, setKayttajat] = useState([]);
  const [ilmoitukset, setIlmoitukset] = useState([]);


  const haeKayttajat = () => {
    DataService.getKayttajat()
      .then((response) => {
        setKayttajat(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const haeIlmoitukset = () => {
    DataService.getIlmoitukset()
      .then((response) => {
        setIlmoitukset(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    haeIlmoitukset();
    haeKayttajat();
  }, []);

  return (
    <div className="ilmoitukset">      
        {ilmoitukset.map((ilmoitus) => (
          <div className="ilmoitus" key={ilmoitus.ilmoitus_id}>
            <div>
              <h1>{ilmoitus.ilmoitus_nimi}</h1>
              <h3>{ilmoitus.ilmoitus_kuvaus}</h3>
            </div>
            {kayttajat.map((kayttaja) => {
              return (kayttaja.kayttaja_id === ilmoitus.ilmoittaja_id ? 
                <div key={kayttaja.kayttaja_id}>
                  Ilmoittaja:<span className="ilmoittaja">{kayttaja.kayttaja_tunnus}</span>
                </div> : "") 
              }
            )}
          </div>
        ))}      
    </div>
  );
};

export default Listaa;
