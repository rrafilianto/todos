import React, { useEffect, useState } from 'react';
import { Grid, Card, Icon, Button, Label, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {
  apiTodoList,
  apiTodoDelete
} from '../../../utils/services/api-service';
import ErrorModal from '../../../components/modals/error-modal';
import SuccessModal from '../../../components/modals/success-modal';
import ConfirmModal from '../../../components/modals/confirm-modal';

const ListTodo = () => {
  const [listTodo, setListTodo] = useState([]);
  const [isOpenErrorModal, setOpenErrorModal] = useState(false);
  const [isOpenSuccessModal, setOpenSuccessModal] = useState(false);
  const [isOpenConfirmModal, setOpenConfirmModal] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const [radioChecked, setRadioChecked] = useState('All');
  const [idTodo, setIdTodo] = useState(null);
  const [limit, setLimit] = useState(10);

  const getListTodo = () => {
    const params = {
      filter: radioChecked,
      limit: limit || 0
    };

    setListTodo([]);

    apiTodoList(params)
      .then(response => {
        const { data } = response.data;
        setListTodo(data);
      })
      .catch(error => {
        const { message } = error.response.data.data;

        setOpenErrorModal(true);
        setMessageModal(message);
      });
  };

  const deleteTodo = () => {
    apiTodoDelete(idTodo)
      .then(() => {
        setOpenConfirmModal(false);
        getListTodo();
      })
      .catch(error => {
        const { message } = error.response.data.data;

        setOpenErrorModal(true);
        setMessageModal(message);
      });
  };

  const changeRadio = (e, { value }) => {
    setRadioChecked(value);
  };

  const changeLimit = (e, { value }) => {
    setLimit(value);
  };

  const handleDeleteTodo = id => {
    setIdTodo(id);
    setOpenConfirmModal(true);
  };

  useEffect(() => {
    getListTodo();
  }, [radioChecked, limit]);

  return (
    <>
      <section>
        <Grid>
          <Link to="/create">
            <Button>New Todo</Button>
          </Link>
        </Grid>
      </section>

      <section>
        <Grid centered>
          <Form>
            <Form.Group inline>
              <label>Filter: </label>
              <Form.Radio
                label="Done"
                value="done"
                checked={radioChecked === 'done'}
                onChange={changeRadio}
              />
              <Form.Radio
                label="Undone"
                value="undone"
                checked={radioChecked === 'undone'}
                onChange={changeRadio}
              />
              <Form.Radio
                label="All"
                value="all"
                checked={radioChecked === 'all'}
                onChange={changeRadio}
              />
            </Form.Group>
            <Form.Group inline>
              <label>Limit: </label>
              <Form.Input
                type="number"
                placeholder="Limit"
                value={limit}
                onChange={changeLimit}
              />
            </Form.Group>
          </Form>
        </Grid>
      </section>

      <section>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            {listTodo.map(({ id, isDone, note, priority, title }) => {
              return (
                <Grid.Column key={id}>
                  <Card fluid>
                    <div style={{ margin: '5px 13px ', width: 10 }}>
                      <Label color="red" ribbon>
                        Priority: {priority}
                      </Label>
                    </div>
                    <Card.Content header={title} textAlign="center" />
                    <Card.Content description={note} textAlign="center" />
                    <Card.Content extra>
                      <Label color="blue" image>
                        <Icon name="info" />
                        {isDone ? 'Done' : 'Not Done'}
                      </Label>
                      <Button.Group floated="right">
                        <Link to={`/edit/${id}`}>
                          <Button
                            size="mini"
                            content="Edit"
                            icon="signup"
                            positive
                          />
                        </Link>
                        <Button
                          size="mini"
                          content="Delete"
                          icon="delete"
                          negative
                          onClick={() => handleDeleteTodo(id)}
                        />
                      </Button.Group>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              );
            })}
          </Grid.Row>
        </Grid>
      </section>

      <ErrorModal
        content={messageModal}
        open={isOpenErrorModal}
        handleClose={() => setOpenErrorModal(!isOpenErrorModal)}
      />
      <SuccessModal
        content={messageModal}
        open={isOpenSuccessModal}
        handleClose={() => setOpenSuccessModal(!isOpenSuccessModal)}
      />
      <ConfirmModal
        open={isOpenConfirmModal}
        handleClose={() => setOpenConfirmModal(!isOpenConfirmModal)}
        handleConfirm={() => deleteTodo()}
      />
    </>
  );
};

export default ListTodo;
