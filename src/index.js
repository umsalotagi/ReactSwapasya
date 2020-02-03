/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "./layouts/Admin.js";
import RTL from "./layouts/RTL.js";

import "./assets/css/material-dashboard-react.css?v=1.8.0";

import {KeycloakService} from './utils/keycloak.service';

const hist = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { keycloak: 'ok', keycloakservice: 'ok',
     authenticated: false, user: 'ok' };
  }

  componentWillMount() {
    KeycloakService.init().then( () => {
      let key = new KeycloakService();
      this.setState({keycloak: KeycloakService.auth.authz,
        keycloakservice: key,
        authenticated: KeycloakService.auth.loggedIn,
        user: KeycloakService.user});
      console.log("logged in successfully ... ");
      console.log(this.state);
      }
    ).catch( () => {
      console.log("error in log in ...");
    }
    );
  }

  render() {
    if(this.state.keycloak) {
      if(this.state.authenticated) {
        return (
          <Router history={hist}>
            <Switch>
              <Route path="/admin" component={Admin} />
              <Route path="/rtl" component={RTL} />
              <Redirect from="/" to="/admin/dashboard" />
            </Switch>
          </Router>
        );
      }
    }
    return (<h1> Login Failed </h1>);
  }

}


ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
