import React, { useState } from "react";
// import DataService from "./services/Services";

const Kirjautuminen = ({Login}) => {
  const initialKayttajaState = {
    kayttaja_tunnus: "",
    kayttaja_salasana: "",
    kayttaja_sahkoposti: "",
  };

  const [kayttaja, setKayttaja] = useState(initialKayttajaState);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setKayttaja({ ...kayttaja, [name]: value });
    Login(kayttaja);
  };

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
            onClick={handleInputChange}
            className="card"
          >
            Kirjaudu sisään
          </button>
    </div>
  );
};

export default Kirjautuminen;
