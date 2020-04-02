import { ObjectSchema } from 'yup';

type GetValidate = boolean | FormValues;

export const getValidate = (validationSchema: ObjectSchema) => (values: FormValues) => {
  try {
    validationSchema.validateSync(
      values,
      { abortEarly: false, context: { values } },
    );
  } catch (err) {
    return err.inner.reduce(
      (errors: any, { path, message }: {
        path: string;
        message: string;
      }) => ({
        ...errors,
        [path]: errors[path] ? `${errors[path]}. ${message}` : message,
      }),
      {}
    );
  }

  return true;
};
