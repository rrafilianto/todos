import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { apiRegister } from '../../utils/services/api-service';

const useRegister = () => {
  const [isOpenErrorModal, setOpenErrorModal] = useState(false);
  const [isOpenSuccessModal, setOpenSuccessModal] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const history = useHistory();

  const handleSubmitRegister = values => {
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

  const closeSuccessModal = () => {
    setOpenSuccessModal(false);
    return history.push('/');
  };

  const closeErrorModal = () => {
    setOpenErrorModal(false);
  };

  return {
    handleSubmitRegister,
    isOpenErrorModal,
    isOpenSuccessModal,
    closeErrorModal,
    closeSuccessModal,
    messageModal
  };
};

export default useRegister;
