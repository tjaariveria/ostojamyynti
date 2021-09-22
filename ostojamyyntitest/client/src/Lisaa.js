import React, { useState } from "react";
import DataService from "./services/Services";

const Lisaa = () => {
  const initialIlmoitusState = {
    ilmoitus_laji: "",
    ilmoitus_nimi: "",
    ilmoitus_kuvaus: "",
    ilmoitus_paivays: "",
    ilmoittaja_id: "",
  };

  let date = new Date().toISOString().slice(0, 19).replace("T", " ");

  const [ilmoitus, setIlmoitus] = useState(initialIlmoitusState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setIlmoitus({ ...ilmoitus, [name]: value });
  };

  const saveIlmoitus = () => {
    const data = {
      ilmoitus_laji: ilmoitus.ilmoitus_laji,
      ilmoitus_nimi: ilmoitus.ilmoitus_nimi,
      ilmoitus_kuvaus: ilmoitus.ilmoitus_kuvaus,
      ilmoitus_paivays: date,
      ilmoittaja_id: ilmoitus.ilmoittaja_id,
    };

    DataService.createIlmoitus(data)
      .then((response) => {
        setIlmoitus({
          ilmoitus_laji: response.data.ilmoitus_laji,
          ilmoitus_nimi: response.data.ilmoitus_nimi,
          ilmoitus_kuvaus: response.data.ilmoitus_kuvaus,
          ilmoitus_paivays: date,
          ilmoittaja_id: response.data.ilmoittaja_id,
        });
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newIlmoitus = () => {
    setIlmoitus(initialIlmoitusState);
    setSubmitted(false);
  };

  return (
    <div className="form">
      {submitted ? (
        <div>
          <h4>Ilmoitus lisätty onnistuneesti!</h4>
          <button className="btn btn-success" onClick={newIlmoitus}>
            Lisää uusi ilmoitus
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="ilmoitus_laji">Ilmoitus laji: </label>
            <select
              name="ilmoitus_laji"
              className="form-control"
              onChange={handleInputChange}
            >
              <option defaultValue={"1"}>Myynti</option>
              <option value={"2"}>Osto</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ilmoitus_nimi">Ilmoitus nimi: </label>
            <input
              name="ilmoitus_nimi"
              type="text"
              className="form-control"
              required
              value={ilmoitus.ilmoitus_nimi}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ilmoitus_kuvaus">Ilmoitus kuvaus: </label>
            <input
              name="ilmoitus_kuvaus"
              type="text"
              className="form-control"
              required
              value={ilmoitus.ilmoitus_kuvaus}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ilmoittaja_id">Ilmoittaja id: </label>
            <input
              name="ilmoittaja_id"
              type="text"
              className="form-control"
              required
              value={ilmoitus.ilmoittaja_id}
              onChange={handleInputChange}
            />
          </div>

          <button onClick={saveIlmoitus} className="btn btn-success">
            Lisää ilmoitus
          </button>
        </div>
      )}
    </div>
  );
};

export default Lisaa;
