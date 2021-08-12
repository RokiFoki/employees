import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import AddEmployeePage from './components/AddEmployeePage/AddEmployeePage';

function App() {
  return (
    <div className="App">      
      <Switch>
        <Route path="/">
          <AddEmployeePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
