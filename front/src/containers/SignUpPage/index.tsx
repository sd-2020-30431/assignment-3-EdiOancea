import React, {
  useEffect,
  useContext,
  useState,
} from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import Button from '../../components/forms/Button';
import TextField from '../../components/forms/TextField';
import SignUpComponent from '../../components/forms/SignUp';
import Form from '../../components/forms/Form';
import APIRequests from '../APIRequests';
import { GlobalContext } from '../App';

const validationSchema = Yup.object<SignUpValidationSchema>().shape({
  email: Yup.string()
    .email('This field must be a valid email')
    .required('This field is required'),
  password: Yup.string().required('This field is required'),
  confirmPassword: Yup.string()
    .required('This field is required')
    .test({
      name: 'equal passwords',
      message: 'This field must be equal to the password field.',
      test: function(value: string) {
        // @ts-ignore
        const { password } = this.options.context.values;

        return value === password;
      }
    }),
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
  {
    fieldProps: {
      id: 'confirmPassword',
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password',
      autoComplete: 'nope',
    },
    component: TextField,
  },
];

const SignUpPage: React.FC<{}> = () => {
  const history = useHistory();
  const { setToken } = useContext(GlobalContext);
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async (values: SignUpValidationSchema) => {
    const { errors } = await APIRequests.request('POST', '/users', values);
    
    if (errors) {
      setErrors(errors);
    } else {
      history.push('/signin');
    }
  };
  const renderForm: () => React.ReactNode = () => (
    <Form
      {...{
        onSubmit,
        validationSchema,
        fields,
        submitButton: { render: () => <Button type="submit">Sign up</Button> },
        errors,
      }}
    />
  );

  useEffect(() => {
    setToken('');
  }, [setToken]);

  return (
    <SignUpComponent renderForm={renderForm}/>
  );
};

export default SignUpPage;
