import moment from 'moment';

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

const countryFields: {[key: number]: IField[]} = {
    1: [{
        label: 'Holiday allowance',
        name: 'holidayAllowance',
        type: 'number',
        required: true,
        constraints: [{
            type: 'min',
            value: 30
        }]
    }, { 
        label: 'Marital status', 
        name: 'martialStatus',
        type: 'select', 
        required: true,
        options: ['Married', 'Not Married']
    }, { 
        label: 'Social insurance number', 
        name: 'SIN',
        type: 'input',
        required: true,
        constraints: [{
            type: 'regex',
            value: /^\d{8}$/
        }]
    }], 
    2: [{
        label: 'Holiday allowance',
        name: 'holidayAllowance',
        type: 'number',
        required: true,
        constraints: [{
            type: 'min',
            value: 0
        }]
    }, { 
        label: 'Marital status', 
        name: 'martialStatus',
        type: 'select', 
        required: true,
        options: ['Married', 'Not Married']
    }, { 
        label: 'Number of children', 
        name: 'numberOfChildren',
        type: 'number',
        required: true,
        constraints: [{
            type: 'min',
            value: 0
        }]
    }], 
    3:  [{
        label: 'Holiday allowance',
        name: 'holidayAllowance',
        type: 'number',
        required: true,
        constraints: [{
            type: 'max',
            value: 40
        }]
    }, { 
        label: 'Working hours', 
        name: 'workingHours',
        type: 'number', 
        required: true,
        constraints: [{
            type: 'min',
            value: 0
        }, {
            type: 'min',
            value: 80
        }]
    }]
}


export function fetchEmployee(id?: number): Promise<IEmployeeCreateData> {
    console.log('fetching employees');
    if (id === undefined) {
        return Promise.resolve<IEmployeeCreateData>({});
    }
    
    return Promise.resolve({
        id: 1,
        country: {...countries[0]},
        firstname: 'James',
        lastname: 'Bond',
        dateOfBirth: moment("19931111", "YYYYMMDD"),
        SIN: '12345678',
        martialStatus: 'Not Married',
        holidayAllowance: 35
    });
}

export function fetchCountries() {
    console.log('fetching countries');
    return Promise.resolve<ICountry[]>(countries)
}

export function fetchExtraFields(countryId?: number) {
    if (countryId === undefined) {
        return Promise.resolve<IField[]>([]);
    }
    
    return Promise.resolve(countryFields[countryId]);
}

export interface IAbstractField {
    required: boolean,
    label?: string,
    name: string,
    type: 'input' | 'textarea' | 'number' | 'select'
    constraints?: IFieldConstraint[]
}

export interface IFieldConstraint {
    type: 'max' | 'min' | 'regex'
    value: RegExp | number;
}

export interface IInputField extends IAbstractField {
    type: 'input',
}

export interface ITextAreaField extends IAbstractField {
    type: 'textarea',
}

export interface INumberField extends IAbstractField {
    type: 'number',
}

export interface ISelectField extends IAbstractField {
    type: 'select',
    options: string[]
}

export type IField = IInputField | ITextAreaField | INumberField | ISelectField;

export interface IEmployeeCreateData {
    id?: 1,
    country?: ICountry,
    firstname?: string,
    lastname?: string,
    dateOfBirth?: moment.Moment
    holidayAllowance?: number,
    martialStatus?: string,
    SIN?: string,
    numberOfChildren?: string,
    workingHours?: string
}

export interface ICountry {
    id: number,
    name: string;
}