import React from "react";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Koti from "./Koti";
import Listaa from "./Listaa";
import Lisaa from "./Lisaa";
// import Login from "./Login";
// import LoginForm from './components/LoginForm';

const Main = () => {
 
  return (
        <BrowserRouter>
          <h1>Perus Single Page Application (SPA)</h1>
          <ul className="header">
            <li><NavLink exact to="/">Koti</NavLink></li>
            <li><NavLink to="/listaa">Listaa ilmoitukset</NavLink></li>
            <li><NavLink to="/lisaa">Lisää ilmoitus</NavLink></li>          
          </ul>
          <div className="content">
            <Route exact path="/" component={Koti} />
            <Route path="/listaa" component={Listaa} />
            <Route path="/lisaa" component={Lisaa} />
          </div>
        </BrowserRouter>
  );
}

export default Main;