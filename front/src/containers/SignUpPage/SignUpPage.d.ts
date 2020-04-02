type SignUpPageProps = RouteComponentProps<{
  validationSchema: ObjectSchema;
}>;

interface SignUpValidationSchema {
  email?: string;
  password?: string;
  confirmPassword?: string;
}
