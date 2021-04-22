import React, {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios'
import UserForm from './UserForm'
import User from './User'
import * as yup from "yup";
import schema from './validation/formSchema'

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  termsOfService: false,
};
const initialFormErrors = {
  name: "",
  email: "",
  password: "",
}
const initialUsers= []
const initialDisabled = true;

export default function App() {
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios
      .get('https://reqres.in/api/users')
      .then(res => {
        console.log(res)
        console.log(res.data.data)
        setUsers(res.data.data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({...formValues, [name]: value})
  }

  const postNewUser = newUser => {
    axios
    .post('https://reqres.in/api/users', newUser)
    .then(res => {
      setUsers([res.data, ...users])
      setFormValues(initialFormValues)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    };
    postNewUser(newUser);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="App">
      <header>
        <h1>User Onboarding</h1>
      </header>
      <UserForm 
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      {
        users.map(user => {
          return <User key={user.id} details={user} />
        })
      }
    </div>
  );
}
