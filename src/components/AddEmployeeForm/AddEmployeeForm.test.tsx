import React from 'react';
import ReactDOM from 'react-dom';
import AddEmployeeForm from './AddEmployeeForm';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddEmployeeForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});