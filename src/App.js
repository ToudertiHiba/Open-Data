
import React from 'react';
// import MyMapp from './Components/Map/MyMapp';
import MyMapBackup from './Components/Map/MyMapBackup';
import AnimatableBarChart2 from "./Components/BarChart/AnimatableBarChart2"
import Play from './Components/Test/Play';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>

        <Route path="/country/:id" render={({ match }) => (
          <AnimatableBarChart2 countryCode={match.params.id} />
        )} />

        <Route path="/play">
          <Play />
        </Route>
        <Route path="/">
          <MyMapBackup />
        </Route>
      </Switch >
    </Router>
  )
}
export default App