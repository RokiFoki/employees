import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock("react-router-dom", () => {
  return {
    Switch: ({children}: any) => <div id="switch">{children}</div>,
    Route: ({children}: any) => <div id="route">{children}</div>
  }
});

jest.mock("./components/AddEmployeePage/AddEmployeePage", () => () => <div id="AddEmployeePage">{}</div>)

test('App test content', () => {
  const {container} = render(<App />);
  expect(container?.firstChild).toHaveClass("App");
  expect(container.querySelector('#switch')).toBeTruthy();
  expect(container.querySelector('#route')).toBeTruthy();
  expect(container.querySelector('#AddEmployeePage')).toBeTruthy();
});

