import * as yup from 'yup';

const addressSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  country: yup.string().required(),
});
