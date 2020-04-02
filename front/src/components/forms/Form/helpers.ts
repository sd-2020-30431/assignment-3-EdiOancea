type GetValidate = boolean | FormValues;

export const getValidate = (validationSchema) => (values: FormValues) => {
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
