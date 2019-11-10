import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { apiLogin } from '../../utils/services/api-service';
import auth from '../../utils/services/authentication-service';

const useLogin = () => {
  const [isOpenErrorModal, setOpenErrorModal] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const history = useHistory();

  const handleSubmitLogin = reqBody => {
    apiLogin(reqBody)
      .then(response => {
        const { token } = response.data.data;
        auth.setToken(token);
        return history.push('/list');
      })
      .catch(error => {
        const { message } = error.response.data.data;

        setOpenErrorModal(true);
        setMessageModal(message);
      });
  };

  const closeErrorModal = () => {
    setOpenErrorModal(false);
  };

  return {
    handleSubmitLogin,
    closeErrorModal,
    isOpenErrorModal,
    messageModal
  };
};

export default useLogin;
