import { Button, Card, DatePicker, Form, Input, InputNumber, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCountries, fetchEmployee, fetchExtraFields, IEmployeeCreateData } from '../../queries/employees/employees';
import { isEmptyObject } from '../../utils/utils';
import './AddEmployeeForm.css';

const AddEmployeeForm: React.FC<IAddEmployeeFormProps> = ({employerId}: IAddEmployeeFormProps) => {
  const [employee, setEmployee] = useState<IEmployeeCreateData>({});
  const [form] = Form.useForm();

  const countries = useQuery('countries', () => fetchCountries());
  const employeesQ = useQuery(['employees', employerId], () => fetchEmployee(employerId), {
    onSuccess: (data) => {
      setEmployee(employee => isEmptyObject(employee) ? data: employee)      
    }
  }); 
  
  useEffect(() => {
    const formData = {...employee, country: employee.country?.id}
    form.setFieldsValue(formData);
  }, [employee])
  
  const extraFields = useQuery(['employees', 'extraFields', employee.country?.id], 
    () => fetchExtraFields(employee.country?.id), {enabled: employee.country?.id !== undefined});

  const selectCountry = (id: number) => {
    setEmployee(employee => ({...employee, country: countries.data?.find(c => c.id === id)}))
  };

  const onFinish = (formData: any) => {
    console.log(formData); // if you don't want hidden info to be saved
    console.log(employee); // if you want hidden info to be saved as well
  }
  if (countries.error || employeesQ.error || extraFields.error) return <>Error happened </>

  const updateEmployeeField = (field: string, value: any) => {
    setEmployee(employee => ({...employee, [field]: value}));
  }
  return (
    <Card>
      <div className="AddEmployeeForm">
        <Typography.Title level={3} className="title">{employerId ? 'Edit' : 'Add a New' } Employee</Typography.Title>
        <Form
          form={form}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={onFinish}>
          <Form.Item
            label="Country of work"
            name="country"
            rules={[{required: true, message: 'Please select the country of work'}]}>
            <Select value={employee.country?.id} onChange={selectCountry}
              placeholder={'Please select...'} loading={countries.isLoading}>
              {countries.data && countries.data.map(c => <Select.Option value={c.id} key={c.id}>{c.name}</Select.Option>)}
            </Select>
          </Form.Item>

          <Form.Item
            label="First name"
            name="firstname"
            rules={[{required: true, message: 'Please insert first name'}]}>
            <Input value={employee.firstname} onChange={(event) => updateEmployeeField('firstname', event.target.value)}/>
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastname"
            rules={[{required: true, message: 'Please insert last name'}]}>
            <Input value={employee.lastname} onChange={(event) => updateEmployeeField('lastname', event.target.value)}/>
          </Form.Item>

          <Form.Item
            label="Date of birth"
            name="dateOfBirth"
            rules={[{required: true, message: 'Please select date of birth'}]}>
            <DatePicker value={employee.dateOfBirth} onChange={date => updateEmployeeField('dateOfBirth', date)}/>
          </Form.Item>

          {extraFields.isLoading && <div>Loading additional fields</div>}
          {extraFields.data?.map(f => 
            <Form.Item key={f.name}
              label={f.label}
              name={f.name}
              rules={
                f.constraints?.filter(c => c.type === 'regex').map(c => ({ 
                  pattern: c.value as RegExp, 
                  message: `${f.label} is incorrect.`  
                })).concat([{required: f.required, message: `${f.label} is required.`}] as any)
              }>
                { f.type === 'textarea' ? <Input.TextArea value={(employee as any)[f.name]} onChange={(event) => updateEmployeeField(f.name, event.target.value)} /> :
                  f.type === 'number' ?  <InputNumber value={(employee as any)[f.name]} onChange={(value) => updateEmployeeField(f.name, value)}
                                              min={f.constraints?.find(c => c.type === 'min')?.value as number}
                                              max={f.constraints?.find(c => c.type === 'max')?.value as number} /> :
                  f.type ==='select'? <Select value={(employee as any)[f.name]} onChange={(value) => updateEmployeeField(f.name, value)}>
                    {f.options.map(o => <Select.Option value={o} key={o}>{o}</Select.Option>)}
                  </Select> : 
                  <Input value={(employee as any)[f.name]} onChange={(event) => updateEmployeeField(f.name, event.target.value)} />
                  }
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
