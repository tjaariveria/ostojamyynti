import React, { useState } from "react";
import DataService from "./services/Services";
import Date from 'react-datetime';

const Lisaa = () => {
  const initialIlmoitusState = {
    ilmoitus_laji: "",
    ilmoitus_nimi: "",
    ilmoitus_kuvaus: "",
    ilmoitus_paivays: "",
    ilmoittaja_id: "",
  };

  let date = new Date();

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
      ilmoittaja_id: ilmoitus.ilmoittaja_id
      
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
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Ilmoitus lisätty onnistuneesti!</h4>
          <button className="btn btn-success" onClick={newIlmoitus}>
            Add
          </button>
        </div>
      ) : (
        <div>
            
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
          
          {/* <div className="form-group">
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
          </div> */}

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
