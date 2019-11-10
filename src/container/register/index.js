import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, Form, Label } from 'semantic-ui-react';
import { RegisterSchema } from '../../utils/schema/register-schema';
import { apiRegister } from '../../utils/services/api-service';
import ErrorModal from '../../components/modals/error-modal';
import SuccessModal from '../../components/modals/success-modal';

const Register = () => {
  const [isOpenErrorModal, setOpenErrorModal] = useState(false);
  const [isOpenSuccessModal, setOpenSuccessModal] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const history = useHistory();

  const onSubmitRegister = values => {
    apiRegister(values)
      .then(response => {
        const { message } = response.data.data;

        setOpenSuccessModal(true);
        setMessageModal(message);
      })
      .catch(error => {
        const { message } = error.response.data.data;

        setOpenErrorModal(true);
        setMessageModal(message);
      });
  };

  return (
    <section>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={values => onSubmitRegister(values)}
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
                type="text"
                name="name"
                icon="user"
                iconPosition="left"
                label="Name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && (
                <Label basic color="red" pointing>
                  {errors.name}
                </Label>
              )}
            </Form.Field>
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

            <Button type="submit" content="Sign Up" primary />
          </Form>
        )}
      </Formik>

      <ErrorModal
        content={messageModal}
        open={isOpenErrorModal}
        handleClose={() => setOpenErrorModal(!isOpenErrorModal)}
      />
      <SuccessModal
        content={messageModal}
        open={isOpenSuccessModal}
        handleClose={() => history.push('/')}
      />
    </section>
  );
};

export default Register;
