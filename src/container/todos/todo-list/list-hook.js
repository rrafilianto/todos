import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  apiTodoList,
  apiTodoDelete
} from '../../../utils/services/api-service';

const useList = () => {
  const [listTodo, setListTodo] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [isOpenErrorModal, setOpenErrorModal] = useState(false);
  const [isOpenSuccessModal, setOpenSuccessModal] = useState(false);
  const [isOpenConfirmModal, setOpenConfirmModal] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const [radioChecked, setRadioChecked] = useState('all');
  const [idTodo, setIdTodo] = useState(null);
  const [limit, setLimit] = useState(10);
  const history = useHistory();

  const handleErrorFetching = message => {
    setOpenErrorModal(true);
    setMessageModal(message);
  };

  const handleGetListTodo = () => {
    setFetching(true);
    const params = {
      filter: radioChecked,
      limit: limit || 0
    };

    setListTodo([]);

    apiTodoList(params)
      .then(response => {
        const { data } = response.data;
        setListTodo(data);
        setFetching(false);
      })
      .catch(error => {
        const { message } = error.response.data.data;
        handleErrorFetching(message);
        setFetching(false);
      });
  };

  const handleDeleteTodo = () => {
    apiTodoDelete(idTodo)
      .then(() => {
        setOpenConfirmModal(false);
        handleGetListTodo();
      })
      .catch(error => {
        const { message } = error.response.data.data;
        handleErrorFetching(message);
      });
  };

  const handleConfirmModal = id => {
    setIdTodo(id);
    setOpenConfirmModal(true);
  };

  const handleChangeRadio = (e, { value }) => {
    setRadioChecked(value);
  };

  const handleChangeLimit = (e, { value }) => {
    setLimit(value);
  };

  const closeModal = key => {
    if (key === 'success') {
      setOpenSuccessModal(false);
    } else if (key === 'error') {
      setOpenErrorModal(false);
    } else {
      setOpenConfirmModal(false);
    }
  };

  const handleDirectLink = link => {
    return history.push(link);
  };

  useEffect(() => {
    handleGetListTodo();
  }, [radioChecked, limit]);

  return {
    handleDeleteTodo,
    handleConfirmModal,
    handleChangeRadio,
    handleChangeLimit,
    handleDirectLink,
    listTodo,
    isFetching,
    isOpenSuccessModal,
    isOpenErrorModal,
    isOpenConfirmModal,
    closeModal,
    messageModal,
    radioChecked,
    limit
  };
};

export default useList;
