import React, { useState } from "react";
import DataService from "./services/Services";

const Rekisteroidu = () => {
  const initialKayttajaState = {
    kayttaja_tunnus: "",
    kayttaja_salasana: "",
    kayttaja_sahkoposti: "",
  };

  const [kayttaja, setKayttaja] = useState(initialKayttajaState);
  const [submitted, setSubmitted] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const kayttajaTaso = "user";

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setKayttaja({ ...kayttaja, [name]: value });
    DataService.getKayttajat().then((res) => {
      res.data.map((e) => {
        if (e.kayttaja_tunnus === event.target.value) {
          setCanSubmit(false);
        } else {
          setCanSubmit(true);
        }
        return "";
      });
    });
  };

  const saveKayttaja = () => {
    const data = {
      kayttaja_taso: kayttajaTaso,
      kayttaja_tunnus: kayttaja.kayttaja_tunnus,
      kayttaja_salasana: kayttaja.kayttaja_salasana,
      kayttaja_sahkoposti: kayttaja.kayttaja_sahkoposti,
    };

    DataService.createKayttaja(data)
      .then((response) => {
        setKayttaja({
          kayttaja_taso: kayttajaTaso,
          kayttaja_tunnus: response.data.kayttaja_tunnus,
          kayttaja_salasana: response.data.kayttaja_salasana,
          kayttaja_sahkoposti: response.data.kayttaja_sahkoposti,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newKayttaja = () => {
    setKayttaja(initialKayttajaState);
    setSubmitted(false);
  };

  return (
    <div className="form">
      {submitted ? (
        <div className="card">
          <h4>Uusi käyttäjä luotu onnistuneesti!</h4>
          <button onClick={newKayttaja}>
            Add
          </button>
        </div>
      ) : (
        <div className="registerForm">
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
            <span>{!canSubmit ? "Käyttäjätunnus on jo käytössä!" : ""}</span>
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

          <div className="form-group">
            <label htmlFor="kayttaja_sahkoposti">Sähköposti: </label>
            <input
              type="email"
              className="form-control"
              id="kayttaja_sahkoposti"
              required
              value={kayttaja.kayttaja_sahkoposti}
              onChange={handleInputChange}
              name="kayttaja_sahkoposti"
            />
          </div>

          <button
            disabled={!canSubmit}
            onClick={saveKayttaja}
            className="card"
          >
            Rekisteröidy
          </button>
        </div>
      )}
    </div>
  );
};

export default Rekisteroidu;
