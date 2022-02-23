import React from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import View from "./views";


const Routing = () => {
    return (
      <Router>
        
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route exact path="/home" component={View.Home} />
          <Route exact path="/server" component={View.Server} />
          <Route exact path="/application" component={View.Application} />
        </Switch>
      </Router>
    );

}

export default Routing
