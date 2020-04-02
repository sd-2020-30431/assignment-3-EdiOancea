import React from 'react';
import styled from 'styled-components';
import { Form as RFForm } from 'react-final-form';
import Error from '../Error';

import { getValidate } from './helpers';

const StyledForm = styled.form`
  width: 100%;
`;

const Form: React.FC<FormType> = ({
  onSubmit,
  validationSchema,
  fields,
  submitButton,
  errors,
}) => {
  return (
    <RFForm
      {...{
        onSubmit,
        validate: getValidate(validationSchema),
        render: ({ handleSubmit }) => (
          <StyledForm noValidate={true} onSubmit={handleSubmit}>
            {fields.map(({ component: Component, fieldProps }: FieldType) => (
              <Component
                {...{
                  ...fieldProps,
                  key: fieldProps.id,
                }}
              />
            ))}
            {errors && errors.map((error: { message: string; }) => (
              <Error
                {...{
                  error: error.message,
                  touched: true,
                }}
              />
            ))}
            {submitButton.render()}
          </StyledForm>
        ),
      }}
    />
  );
}

export default Form;
