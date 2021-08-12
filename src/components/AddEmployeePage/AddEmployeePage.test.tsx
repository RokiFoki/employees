import React from 'react';
import ReactDOM from 'react-dom';
import AddEmployeePage from './AddEmployeePage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddEmployeePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});