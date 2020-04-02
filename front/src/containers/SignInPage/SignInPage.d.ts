type SignInPageProps = RouteComponentProps<{}> & {
  validationSchema: any;
};

interface SignInValidationSchema {
  email?: string;
  password?: string;
}
