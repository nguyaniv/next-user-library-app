import * as yup from 'yup';

export const validationAddUserSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  firstName: yup.string().trim().min(3, 'First name Minimum 3 character'),
  lastName: yup.string().trim().min(3, 'Last name Minimum 3 character'),
  streetName: yup.string().trim().required('Street name is required'),
  streetNumber: yup.string().trim().required('Street number is required'),
  city: yup.string().trim().required('City is required'),
  country: yup.string().trim().required('Country is required'),
  image: yup.string().required('Image is required'),

  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
});

export const validationEditUserSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  firstName: yup.string().trim().min(3, 'First name Minimum 3 character'),
  lastName: yup.string().trim().min(3, 'Last name Minimum 3 character'),
  streetName: yup.string().trim().required('Street name is required'),
  streetNumber: yup.string().trim().required('Street number is required'),
  city: yup.string().trim().required('City is required'),
  country: yup.string().trim().required('Country is required'),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
});
