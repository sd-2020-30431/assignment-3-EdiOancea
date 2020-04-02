interface FormFieldType extends TextFieldType {};

interface FormValues extends SignInValidationSchema, SignUpValidationSchema {};
interface ValidationSchema extends SignInValidationSchema, SignUpValidationSchema {};

type FieldType = {
  fieldProps: {
    id: string;
    label: string;
    name: string;
    autoComplete: string;
  },
  component: Function,
};

type FormType = {
  onSubmit: any;
  validationSchema: ObjectSchema;
  fields: FieldType[];
  submitButton: { render: any };
  errors: any[] | null;
};
