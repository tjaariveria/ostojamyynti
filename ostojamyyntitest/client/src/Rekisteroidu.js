import React, { useState } from "react";
import DataService from "./services/Services";

const Rekisteroidu = () => {
  const initialKayttajaState = {
    kayttaja_taso: "",
    kayttaja_tunnus: "",
    kayttaja_salasana: "",
    kayttaja_sahkoposti: "",
  };
  const [kayttaja, setKayttaja] = useState(initialKayttajaState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;    
    setKayttaja({ ...kayttaja, [name]: value });
  };

  const saveKayttaja = () => {
    const data = {
      kayttaja_taso: kayttaja.kayttaja_taso,
      kayttaja_tunnus: kayttaja.kayttaja_tunnus,
      kayttaja_salasana: kayttaja.kayttaja_salasana,
      kayttaja_sahkoposti: kayttaja.kayttaja_sahkoposti      
    };

    DataService.createKayttaja(data)
      .then((response) => {
        setKayttaja({
          kayttaja_taso: response.data.kayttaja_taso,
          kayttaja_tunnus: response.data.kayttaja_tunnus,
          kayttaja_salasana: response.data.kayttaja_salasana,
          kayttaja_sahkoposti: response.data.kayttaja_sahkoposti
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
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newKayttaja}>
            Add
          </button>
        </div>
      ) : (
        <div>
            
          <div className="form-group">
            <label htmlFor="kayttaja_taso">kayttaja taso</label>
            <input
              type="text"
              name="kayttaja_taso"
              className="form-control"
              id="kayttaja_taso"
              required
              value={kayttaja.kayttaja_taso}
              placeholder="kayttaja taso"
              onChange={handleInputChange}
              
            />
          </div>

          <div className="form-group">
            <label htmlFor="kayttaja_tunnus">kayttaja tunnus</label>
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
            <label htmlFor="kayttaja_salasana">kayttaja salasana</label>
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
            <label htmlFor="kayttaja_sahkoposti">kayttaja sahkoposti</label>
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

          <button onClick={saveKayttaja} className="btn btn-success">
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Rekisteroidu;
