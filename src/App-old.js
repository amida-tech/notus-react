import React, { useEffect, useState, useContext, createContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// layouts

import Admin from "layouts/dashboard.js";
import Auth from "layouts/Auth.js";
import NotFound from "notFound.js";

const authContext = createContext();

function App() {
  const [code, setCode] = useState('');


  return (
    <BrowserRouter>
      <Switch>
        {/* add routes with layouts */}
        <Route exact path="/" component={Admin} />
        <Route path="/auth" component={Auth} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;