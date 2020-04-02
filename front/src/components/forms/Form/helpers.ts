import { ObjectSchema } from 'yup';

type GetValidate = boolean | FormValues;

// TODO: find validationSchema type
export const getValidate = (validationSchema: ObjectSchema) => (values: FormValues) => {
  try {
    validationSchema.validateSync(
      values,
      { abortEarly: false, context: { values } },
    );
  } catch (err) {
    return err.inner.reduce((errors, { path, message }) => ({
      ...errors,
      [path]: errors[path] ? `${errors[path]}. ${message}` : message,
    }), {});
  }

  return true;
};
