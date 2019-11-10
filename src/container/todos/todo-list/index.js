import React from 'react';
import { Grid, Card, Icon, Button, Label, Form } from 'semantic-ui-react';
import ErrorModal from '../../../components/modals/error-modal';
import SuccessModal from '../../../components/modals/success-modal';
import ConfirmModal from '../../../components/modals/confirm-modal';
import useList from './list-hook';
import PlaceholderList from '../../../components/placeholder/placeholder-list';

const ListTodo = () => {
  const {
    handleDeleteTodo,
    handleConfirmModal,
    handleChangeLimit,
    handleChangeRadio,
    handleDirectLink,
    isOpenSuccessModal,
    isOpenErrorModal,
    isOpenConfirmModal,
    messageModal,
    listTodo,
    isFetching,
    closeModal,
    radioChecked,
    limit
  } = useList();

  return (
    <>
      <section>
        <Grid>
          <Button onClick={() => handleDirectLink('/create')}>New Todo</Button>
        </Grid>
      </section>

      <section>
        <Grid centered>
          <Form>
            <Form.Group inline>
              <label>Status: </label>
              <Form.Radio
                label="Done"
                value="done"
                checked={radioChecked === 'done'}
                onChange={handleChangeRadio}
              />
              <Form.Radio
                label="Undone"
                value="undone"
                checked={radioChecked === 'undone'}
                onChange={handleChangeRadio}
              />
              <Form.Radio
                label="All"
                value="all"
                checked={radioChecked === 'all'}
                onChange={handleChangeRadio}
              />
            </Form.Group>
            <Form.Group inline>
              <label>Limit: </label>
              <Form.Input
                type="number"
                placeholder="Limit"
                value={limit}
                onChange={handleChangeLimit}
              />
            </Form.Group>
          </Form>
        </Grid>
      </section>

      <section>
        {isFetching ? (
          <PlaceholderList />
        ) : (
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
                          <Button
                            size="mini"
                            content="Edit"
                            icon="signup"
                            onClick={() => handleDirectLink(`/edit/${id}`)}
                            positive
                          />
                          <Button
                            size="mini"
                            content="Delete"
                            icon="delete"
                            negative
                            onClick={() => handleConfirmModal(id)}
                          />
                        </Button.Group>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                );
              })}
            </Grid.Row>
          </Grid>
        )}
      </section>

      <ErrorModal
        content={messageModal}
        open={isOpenErrorModal}
        handleClose={() => closeModal('error')}
      />
      <SuccessModal
        content={messageModal}
        open={isOpenSuccessModal}
        handleClose={() => closeModal('success')}
      />
      <ConfirmModal
        open={isOpenConfirmModal}
        handleClose={() => closeModal('confirm')}
        handleConfirm={() => handleDeleteTodo()}
      />
    </>
  );
};

export default ListTodo;
