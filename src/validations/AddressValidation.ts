import * as yup from 'yup';

export const addressSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email('Email is invalid').required(),
  country: yup.string().required(),
});
