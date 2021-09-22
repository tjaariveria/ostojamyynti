import React from "react";
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import Koti from "./Koti";
import Listaa from "./Listaa";
import Lisaa from "./Lisaa";
import Rekisteroidu from "./Rekisteroidu";
// import Login from "./Login";
// import LoginForm from './components/LoginForm';

const Main = () => {
  return (
    <BrowserRouter>
      <div className="mainTitle">
        <h1>Osto ja myyntikanava</h1>
      </div>

      <ul className="header">
        <li>
          <NavLink exact to="/">
            Koti
          </NavLink>
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
      </ul>

      <div className="content">
        <Route exact path="/" component={Koti} />
        <Route path="/rekisteroidu" component={Rekisteroidu} />
        <Route path="/listaa" component={Listaa} />
        <Route path="/lisaa" component={Lisaa} />
      </div>
    </BrowserRouter>
  );
};

export default Main;
