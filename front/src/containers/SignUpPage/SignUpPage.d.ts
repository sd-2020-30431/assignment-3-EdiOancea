type SignUpPageProps = RouteComponentProps<{
  validationSchema: any;
}>;

interface SignUpValidationSchema {
  email?: string;
  password?: string;
  confirmPassword?: string;
}
