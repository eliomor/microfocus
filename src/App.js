import { MuiThemeProvider } from 'material-ui/styles';
import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';

function App() {
  return (
    <MuiThemeProvider>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/Home" exact>
          <Home />
        </Route>
        <Route path="/Search" exact>
          <Search />
        </Route>
      </Switch>
    </Router>   
  </MuiThemeProvider> 
  );
};

export default App;
