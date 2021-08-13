import { render, screen } from '@testing-library/react';
import { ICountry } from '../../queries/employees/employees';
import AddEmployeeForm from './AddEmployeeForm';


const countries: ICountry[] = [{
  id: 1,
  name: 'Spain'
}, {
  id: 2,
  name: 'Ghana'
}, {
  id: 3,
  name: 'Brazil'
}];

jest.mock("react-query", () => ({
  useQuery: (key: string, fn: Function) => {
    return {
      data: countries,
      isLoading: false
    }
  }
}));


const divWithId = (id:string) => ({children}: any) => (<div id={id}>{children}</div>)
jest.mock('antd', () => {
  const antd = jest.requireActual('antd');

  const Select = ({ children, onChange }: any) => {
    return <select onChange={e => onChange(e.target.value)}>{children}</select>;
  };

  Select.Option = ({ children, ...otherProps }:any) => {
    return <option {...otherProps}>{children}</option>;
  }

  const Form = ({children}: any) => (<form>{children}</form>) as any
  Form.Item = divWithId("Form.Item");

  const Typography = divWithId("Typography") as any;
  Typography.Title = divWithId("Typography.Title");

  return {
    ...antd,  
    Select,
    Form,
    Typography
  }
});


test ('AddEmployeeForm with no params is adding a new Employee', () => {
  const {container} = render(<AddEmployeeForm />);
  expect(screen.findByText("Add a new Employee")).toBeTruthy()
})

test ('AddEmployeeForm with params is editing existing Employee', () => {
  const {container} = render(<AddEmployeeForm employerId={1} />);
  expect(screen.findByText("Edit Employee")).toBeTruthy()
})
