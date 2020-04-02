interface FormValues extends SignInValidationSchema, SignUpValidationSchema {};

type FieldType = {
  fieldProps: {
    id: string;
    label: string;
    name: string;
    autoComplete: string;
    type?: string;
  };
  component: React.FC<any>;
};
