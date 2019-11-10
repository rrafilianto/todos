import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, Divider, Form, Grid, Segment, Label } from 'semantic-ui-react';
import { LoginSchema } from '../../utils/schema/login-schema';
import ErrorModal from '../../components/modals/error-modal';
import useLogin from './login-hook';

const Login = () => {
  const {
    handleSubmitLogin,
    closeErrorModal,
    isOpenErrorModal,
    messageModal
  } = useLogin();

  return (
    <section>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={values => handleSubmitLogin(values)}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Field>
                    <Form.Input
                      type="email"
                      name="email"
                      icon="mail"
                      iconPosition="left"
                      label="Email"
                      placeholder="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <Label basic color="red" pointing>
                        {errors.email}
                      </Label>
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      type="password"
                      name="password"
                      icon="lock"
                      iconPosition="left"
                      label="Password"
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password && (
                      <Label basic color="red" pointing>
                        {errors.password}
                      </Label>
                    )}
                  </Form.Field>

                  <Button type="submit" content="Login" primary />
                </Form>
              )}
            </Formik>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Link to="/register">
              <Button content="Sign up" icon="signup" size="big" />
            </Link>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>

      <ErrorModal
        content={messageModal}
        open={isOpenErrorModal}
        handleClose={() => closeErrorModal()}
      />
    </section>
  );
};

export default Login;
