interface FormValues extends SignInValidationSchema, SignUpValidationSchema, GroceryListItemValidationSchema {};

type FieldType = {
  fieldProps: {
    id: string;
    label: string;
    name: string;
    autoComplete: string;
    type?: string;
    defaultValue?: string;
  };
  component: React.FC<any>;
  order?: number;
};
