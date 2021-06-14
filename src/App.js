import './App.css';
import React from 'react'
import Header from './Header'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home.js';
import PokeIndex from './PokeIndex';
import PokeDetail from './PokeDetail';

class App extends React.Component {
  render() {
      return (
          <div className="app">
              <BrowserRouter>
                  <Header />
                  <Switch>
                      <Route path="/" exact component={Home} />
                      <Route path="/pokemon" exact component={PokeIndex} />
                      <Route path="/pokemon/:id" component={PokeDetail} />
                  </Switch>
              </BrowserRouter>
          </div>
      );
  }
}

export default App;