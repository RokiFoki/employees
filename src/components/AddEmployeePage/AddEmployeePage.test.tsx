import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import AddEmployeePage from './AddEmployeePage';

jest.mock('../AddEmployeeForm/AddEmployeeForm', () => 
  () => <div id="AddEmployeeForm"></div>
);

it('AddEmployeePage contents', () => {
  const {container} = render(<AddEmployeePage />);
  expect(container.firstChild).toHaveClass("AddEmployeePage");
  expect(container.querySelector("#AddEmployeeForm")).toBeTruthy();
});