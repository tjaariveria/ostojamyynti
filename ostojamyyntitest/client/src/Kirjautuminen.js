import React, { useState } from "react";
import DataService from "./services/Services";

const Kirjautuminen = () => {
  const initialKayttajaState = {
    kayttaja_tunnus: "",
    kayttaja_salasana: "",
    kayttaja_sahkoposti: "",
  };

  const [kayttaja, setKayttaja] = useState(initialKayttajaState);
  const [canLogin, setCanLogin] = useState(false);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setKayttaja({ ...kayttaja, [name]: value });
    DataService.getKayttajat().then((res) => {
      res.data.map((e) => {
        if (e.kayttaja_tunnus === event.target.value) {
          setCanLogin(true);
        } else {
          setCanLogin(false);
        }
        return "";
      });
    });
  };

  const kirjauduSisaan = () => {

  }

  return (
    <div className="form">
      <div className="form-group">
        <label htmlFor="kayttaja_tunnus">Käyttäjätunnus: </label>
        <input
          type="text"
          className="form-control"
          id="kayttaja_tunnus"
          required
          value={kayttaja.kayttaja_tunnus}
          onChange={handleInputChange}
          name="kayttaja_tunnus"
        />
        {/* <span>{!canSubmit ? "username already in use!" : ""}</span> */}
      </div>

      <div className="form-group">
        <label htmlFor="kayttaja_salasana">Salasana: </label>
        <input
          type="password"
          className="form-control"
          id="kayttaja_salasana"
          required
          value={kayttaja.kayttaja_salasana}
          onChange={handleInputChange}
          name="kayttaja_salasana"
        />
      </div>
      <button
            onClick={kirjauduSisaan}
            className="card"
          >
            Kirjaudu sisään
          </button>
    </div>
  );
};

export default Kirjautuminen;
