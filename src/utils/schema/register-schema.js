import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().required('Required')
});
