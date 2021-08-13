import { Button, Card, DatePicker, Form, Input, InputNumber, Select, Typography } from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCountries, fetchEmployee, fetchExtraFields, IEmployeeCreateData } from '../../queries/employees/employees';
import { isEmptyObject } from '../../utils/utils';
import './AddEmployeeForm.css';

const AddEmployeeForm: React.FC<IAddEmployeeFormProps> = ({employerId}: IAddEmployeeFormProps) => {
  const [employee, setEmployee] = useState<IEmployeeCreateData>({});

  const countries = useQuery('countries', () => fetchCountries());
  const employeeData = useQuery(['employees', employerId], () => fetchEmployee(employerId), {
    onSuccess: (data) => setEmployee(employee => isEmptyObject(employee) ? data: employee)
  });  
  const extraFields = useQuery(['employees', 'extraFields', employee.country?.id], 
    () => fetchExtraFields(employee.country?.id), {enabled: employee.country?.id !== undefined});

  const selectCountry = (id: number) => {
    setEmployee(employee => ({...employee, country: countries.data?.find(c => c.id === id)}))
  };

  const onFinish = (data: any) => {
    console.log(data);
  }
  if (countries.error) return <>Error happened </>

  return (
    <Card>
      <div className="AddEmployeeForm">
        <Typography.Title level={3} className="title">{employerId ? 'Edit' : 'Add a New' } Employee</Typography.Title>
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={onFinish}>
          <Form.Item
            label="Country of work"
            name="country"
            rules={[{required: true, message: 'Please select the country of work'}]}>
            <Select value={employeeData.data?.country?.id} onChange={selectCountry}
              placeholder={'Please select...'} loading={countries.isLoading}>
              {countries.data && countries.data.map(c => <Select.Option value={c.id} key={c.id}>{c.name}</Select.Option>)}
            </Select>
          </Form.Item>

          <Form.Item
            label="First name"
            name="firstname"
            rules={[{required: true, message: 'Please insert first name'}]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastname"
            rules={[{required: true, message: 'Please insert last name'}]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Date of birth"
            name="dateofbirth"
            rules={[{required: true, message: 'Please select date of birth'}]}>
            <DatePicker />
          </Form.Item>


          {extraFields.data?.map(f => 
            <Form.Item key={f.name}
              label={f.label}
              name={f.name}
              rules={[{required: f.required, message: `${f.label} is required.`},
                      { 
                        pattern: f.constraints?.find(c => c.type === 'regex')?.value as RegExp, 
                        message: `${f.label} is incorrect.`  
                      }]}>
                {f.type === 'input' ? <Input /> :
                  f.type === 'textarea' ? <Input.TextArea /> :
                  f.type === 'number' ?  <InputNumber 
                                              min={f.constraints?.find(c => c.type === 'min')?.value as number}
                                              max={f.constraints?.find(c => c.type === 'max')?.value as number} /> :
                  f.type ==='select'? <Select>
                    {f.options.map(o => <Select.Option value={o} key={o}>{o}</Select.Option>)}
                  </Select>: 
                  <Input />}
            </Form.Item>)}

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                Submit
              </Button>
            </Form.Item>
        </Form>
      </div>
    </Card>
  )
};

export interface IAddEmployeeFormProps {
  employerId?: number
}
export default AddEmployeeForm;
