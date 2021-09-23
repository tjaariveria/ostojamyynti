import React, { useState } from "react";
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import Koti from "./Koti";
import Listaa from "./Listaa";
import Lisaa from "./Lisaa";
import Rekisteroidu from "./Rekisteroidu";
import Kirjautuminen from "./Kirjautuminen";
// import Login from "./Login";
// import LoginForm from './components/LoginForm';

const Main = () => {

  const adminUser = {
    tunnus: "pepe",
    password: "koira123"
  }

  const [user, setUser] = useState({ tunnus: "" });

  const Login = details => {
    console.log(details.kayttaja_tunnus)
    if (details.kayttaja_tunnus === adminUser.tunnus && details.kayttaja_salasana === adminUser.password) {
      console.log("logged in");
      setUser({
        tunnus: details.kayttaja_tunnus,
      });
    } else {
      console.log("Details no match");
    }
  }

  const Logout = () => {
    setUser({ tunnus: "" })
  }

  return (
    <div>
      {(user.tunnus !== "") ? (
    
    <BrowserRouter>
      <div className="mainTitle">
        <h1>Osto ja myyntikanava</h1>
      </div>

      <ul className="header">
        <li>
          <NavLink exact to="/">Koti</NavLink>
        </li>
        <li>
          <NavLink to="/rekisteroidu">Rekisteröidy palveluun</NavLink>
        </li>
        <li>
          <NavLink to="/listaa">Listaa ilmoitukset</NavLink>
        </li>
        <li>
          <NavLink to="/lisaa">Lisää ilmoitus</NavLink>
        </li>
        <li className="kirjautuminen">        
        <NavLink to="/kirjautuminen">Kirjaudu sisään</NavLink>
        </li>
        <div className="loginInfo"><span>Kirjautuneena {user.name} </span><span><button className="logout" onClick={Logout}>Logout</button></span></div>
      </ul>

      <div className="content">
        <Route exact path="/" component={Koti} />
        <Route path="/rekisteroidu" component={Rekisteroidu} />
        <Route path="/listaa" component={Listaa} />
        <Route path="/lisaa" component={Lisaa} />
        <Route path="/kirjautuminen" component={Kirjautuminen} />
      </div>
    </BrowserRouter>
      ) :(
        <Kirjautuminen Login={Login} />
      )}
    </div>
  );
};

export default Main;
