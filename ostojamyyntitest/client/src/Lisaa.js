import React, { useState } from "react";
import DataService from "./services/Services";

const Lisaa = () => {
  const initialIlmoitusState = {
    ilmoitus_id: null,
    ilmoitus_laji: "",
    ilmoitus_nimi: "",
    ilmoitus_kuvaus: "",
    ilmoitus_paivays: "",
    ilmoittaja_id: "",
  };
  const [ilmoitus, setIlmoitus] = useState(initialIlmoitusState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;    
    setIlmoitus({ ...ilmoitus, [name]: value });
  };

  const saveIlmoitus = () => {
    const data = {
        ilmoitus_id: ilmoitus.ilmoittaja_id,
      ilmoitus_laji: ilmoitus.ilmoitus_laji,
      ilmoitus_nimi: ilmoitus.ilmoitus_nimi,
      ilmoitus_kuvaus: ilmoitus.ilmoitus_kuvaus,
      ilmoitus_paivays: ilmoitus.ilmoitus_paivays,
      ilmoittaja_id: ilmoitus.ilmoittaja_id
      
    };
    console.log("data saveIlm: " + ilmoitus.ilmoitus_nimi);

    DataService.create(data)
      .then((response) => {
        setIlmoitus({
            ilmoitus_id: response.data.ilmoitus_id,
          ilmoitus_laji: response.data.ilmoitus_laji,
          ilmoitus_nimi: response.data.ilmoitus_nimi,
          ilmoitus_kuvaus: response.data.ilmoitus_kuvaus,
          ilmoitus_paivays: response.data.ilmoitus_paivays,
          ilmoittaja_id: response.data.ilmoittaja_id,
        });
        setSubmitted(true);
        console.log(response.data);
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
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newIlmoitus}>
            Add
          </button>
        </div>
      ) : (
        <div>
            <div className="form-group">
          <label htmlFor="ilmoitus_id">Ilmoitus id</label>
          <input
            type="text"
            name="ilmoitus_id"
            className="form-control"
            id="ilmoitus_id"
            required
            value={ilmoitus.ilmoitus_id}
            placeholder="ilmoitus id"
            onChange={handleInputChange}
          />
        </div>
          <div className="form-group">
            <label htmlFor="ilmoitus_laji">Ilmoitus laji</label>
            <input
              type="text"
              name="ilmoitus_laji"
              className="form-control"
              id="ilmoitus_laji"
              required
              value={ilmoitus.ilmoitus_laji}
              placeholder="ilmoitus laji"
              onChange={handleInputChange}
              
            />
          </div>

          <div className="form-group">
            <label htmlFor="ilmoitus_nimi">Ilmoitus nimi</label>
            <input
              type="text"
              className="form-control"
              id="ilmoitus_nimi"
              required
              value={ilmoitus.ilmoitus_nimi}
              onChange={handleInputChange}
              name="ilmoitus_nimi"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ilmoitus_kuvaus">Ilmoitus kuvaus</label>
            <input
              type="text"
              className="form-control"
              id="ilmoitus_kuvaus"
              required
              value={ilmoitus.ilmoitus_kuvaus}
              onChange={handleInputChange}
              name="ilmoitus_kuvaus"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="ilmoitus_paivays">Ilmoitus paivays</label>
            <input
              type="date"
              className="form-control"
              id="ilmoitus_paivays"
              required
              value={ilmoitus.ilmoitus_paivays}
              onChange={handleInputChange}
              name="ilmoitus_paivays"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ilmoittaja_id">Ilmoittaja id</label>
            <input
              type="text"
              className="form-control"
              id="ilmoittaja_id"
              required
              value={ilmoitus.ilmoittaja_id}
              onChange={handleInputChange}
              name="ilmoittaja_id"
            />
          </div>

          <button onClick={saveIlmoitus} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Lisaa;
