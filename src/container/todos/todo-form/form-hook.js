import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  apiTodoCreate,
  apiTodoDetail,
  apiTodoEdit
} from '../../../utils/services/api-service';

const useCreateTodo = () => {
  const [isFetching, setFetching] = useState(true);
  const [isOpenErrorModal, setOpenErrorModal] = useState(false);
  const [isOpenSuccessModal, setOpenSuccessModal] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const [formDataTodo, setFormDataTodo] = useState(null);
  const history = useHistory();
  const { id } = useParams();

  const handleGetTodo = idTodo => {
    apiTodoDetail(idTodo)
      .then(response => {
        const { data } = response.data;

        setFormDataTodo(data);
        setFetching(false);
      })
      .catch(error => {
        const { message } = error.response.data.data;

        setMessageModal(message);
        setOpenErrorModal(true);
        setFetching(false);
      });
  };

  const handleCreateTodo = reqBody => {
    apiTodoCreate(reqBody)
      .then(() => {
        setOpenSuccessModal(true);
      })
      .catch(error => {
        const { message } = error.response.data.data;

        setMessageModal(message);
        setOpenErrorModal(true);
      });
  };

  const handleUpdateTodo = reqBody => {
    apiTodoEdit(id, reqBody)
      .then(() => {
        setOpenSuccessModal(true);
      })
      .catch(error => {
        const { message } = error.response.data.data;
        setMessageModal(message);
        setOpenErrorModal(true);
      });
  };

  const closeModal = key => {
    if (key === 'error') {
      setOpenErrorModal(false);
    } else {
      setOpenSuccessModal(false);
      return history.push('/list');
    }
  };

  useEffect(() => {
    if (id) {
      setFetching(true);
      handleGetTodo(id);
    } else {
      setFetching(false);
    }
  }, [id]);

  return {
    handleSubmitTodo: id ? handleUpdateTodo : handleCreateTodo,
    isFetching,
    closeModal,
    formDataTodo,
    isOpenErrorModal,
    isOpenSuccessModal,
    messageModal
  };
};

export default useCreateTodo;
