import * as Yup from 'yup';

export const TodoSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  priority: Yup.number()
    .min(1)
    .max(3)
    .required('Required'),
  note: Yup.string().required('Required')
});
