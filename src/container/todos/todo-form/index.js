import React from 'react';
import { Formik } from 'formik';
import { Button, Form, Label } from 'semantic-ui-react';
import { TodoSchema } from '../../../utils/schema/todo-schema';
import ErrorModal from '../../../components/modals/error-modal';
import SuccessModal from '../../../components/modals/success-modal';
import useCreateTodo from './form-hook';

const FormTodo = () => {
  const {
    handleSubmitTodo,
    isFetching,
    handleSuccessModal,
    handleErrorModal,
    formDataTodo,
    isOpenErrorModal,
    isOpenSuccessModal,
    messageModal
  } = useCreateTodo();

  const { title, priority, note } = formDataTodo || {};

  return (
    <section>
      {!isFetching && (
        <Formik
          initialValues={{
            title: title || '',
            priority: priority || '',
            note: note || ''
          }}
          validationSchema={TodoSchema}
          onSubmit={values => handleSubmitTodo(values)}
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
                  name="title"
                  icon="clipboard"
                  iconPosition="left"
                  label="Title"
                  placeholder="Title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                {errors.title && touched.title && (
                  <Label basic color="red" pointing>
                    {errors.title}
                  </Label>
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="number"
                  name="priority"
                  icon="chart line"
                  iconPosition="left"
                  label="Priority"
                  placeholder="Priority"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.priority}
                />
                {errors.priority && touched.priority && (
                  <Label basic color="red" pointing>
                    {errors.priority}
                  </Label>
                )}
              </Form.Field>
              <Form.Field>
                <Form.TextArea
                  type="textarea"
                  name="note"
                  label="Note"
                  placeholder="Note"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.note}
                />
                {errors.note && touched.note && (
                  <Label basic color="red" pointing>
                    {errors.note}
                  </Label>
                )}
              </Form.Field>

              <Button type="submit" content="Submit Todo" primary />
            </Form>
          )}
        </Formik>
      )}

      <ErrorModal
        content={messageModal}
        open={isOpenErrorModal}
        handleClose={() => handleErrorModal()}
      />
      <SuccessModal
        content={messageModal}
        open={isOpenSuccessModal}
        handleClose={() => handleSuccessModal()}
      />
    </section>
  );
};

export default FormTodo;
