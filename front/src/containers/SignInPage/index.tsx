import React, { useEffect, useContext } from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import Button from '../../components/forms/Button';
import TextField from '../../components/forms/TextField';
import SignInComponent from '../../components/forms/SignIn';
import Form from '../../components/forms/Form';
import APIRequests from '../APIRequests';
import { GlobalContext } from '../App';

const validationSchema = Yup.object<SignInValidationSchema>().shape({
  email: Yup.string().required('This field is required'),
  password: Yup.string().required('This field is required'),
});

const fields: FieldType[] = [
  {
    fieldProps: {
      id: 'email',
      label: 'Email',
      name: 'email',
      autoComplete: 'off',
    },
    component: TextField,
  },
  {
    fieldProps: {
      id: 'password',
      label: 'Password',
      name: 'password',
      type: 'password',
      autoComplete: 'nope',
    },
    component: TextField,
  },
];

const SignInPage: React.FC<{}> = () => {
  const history = useHistory();
  const { token, setToken } = useContext(GlobalContext);
  const onSubmit = async (values: SignInValidationSchema) => {
    const { token } = await APIRequests.request('POST', '/auth', values);

    if (token) {
      setToken(token);

      history.push('/');
    }
  };

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, [token, history]);

  const renderForm: () => React.ReactNode = () => (
    <Form
      {...{
        onSubmit,
        validationSchema,
        fields,
        submitButton: { render: () => <Button type="submit">Sign in</Button> },
      }}
    />
  );

  return (
    <SignInComponent renderForm={renderForm}/>
  );
};

export default SignInPage;
