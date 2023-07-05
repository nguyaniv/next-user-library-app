import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { editUser } from '../features/usersSlice';
import Button from '@mui/material/Button';

function UserEdit({ selectedUser, handleClose, open }: any) {
  const [message, setMesssage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    setFirstName(selectedUser?.name?.first || '');
    setLastName(selectedUser?.name?.last || '');
    setTitle(selectedUser?.name?.title || '');
    setEmail(selectedUser?.email || '');
    setStreetName(selectedUser?.location?.street?.name || '');
    setStreetNumber(selectedUser?.location?.street?.number || '');
    setCountry(selectedUser?.location?.country || '');
    setCity(selectedUser?.location?.city || '');
  }, [selectedUser]);

  const validationSchema = yup.object({
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

  const onEditUser = async (e: any) => {
    e.preventDefault();
    try {
      const isValid = await validationSchema.validate({
        title,
        email,
        firstName,
        lastName,
        streetName,
        streetNumber,
        city,
        country,
      });

      if (isValid) {
        dispatch(
          await editUser({
            title,
            email,
            firstName,
            lastName,
            streetName,
            streetNumber,
            city,
            country,
            uuid: selectedUser?.uuid,
          })
        );
        setSuccessMessage('Edit user successfully');
        setTimeout(() => {
          setSuccessMessage('');
          handleClose();
        }, 3000);
      }
    } catch (error: any) {
      setMesssage(error.message);
      setTimeout(() => {
        setMesssage('');
      }, 3000);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="grid place-items-center overflow-y-scroll md:overscroll-y-none "
    >
      <form
        onSubmit={onEditUser}
        className="border px-20 lg:w-full max-w-3xl py-10 border-yellow-50  grid bg-white gap-y-10 "
      >
        <h3 className="text-2xl text-center">Edit User card</h3>
        <Image
          className="rounded-full border border-gray-300 place-self-center"
          alt={`${selectedUser?.first} ${selectedUser?.last}`}
          src={selectedUser?.userImage}
          width={150}
          height={200}
        />
        <div className="grid gap-y-5  md:grid-flow-col  md:gap-x-5">
          {
            <div className="grid ">
              <TextField
                hiddenLabel
                id="filled-hidden-label-medium"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                onBlur={selectedUser?.handleBlur}
                variant="outlined"
                size="medium"
                placeholder="Mr/Mis"
              />
            </div>
          }

          <div className="grid">
            <TextField
              hiddenLabel
              id="filled-hidden-label-medium"
              value={firstName}
              onChange={(e: any) => setFirstName(e.target.value)}
              variant="outlined"
              size="medium"
              placeholder="First Name"
            />
          </div>
          <div className="grid">
            <TextField
              hiddenLabel
              id="filled-hidden-label-medium"
              value={lastName}
              onChange={(e: any) => setLastName(e.target.value)}
              variant="outlined"
              size="medium"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="grid md:grid-flow-col gap-y-5 gap-x-3">
          <TextField
            hiddenLabel
            id="filled-hidden-label-medium"
            value={streetName}
            onChange={(e: any) => setStreetName(e.target.value)}
            variant="outlined"
            size="medium"
            placeholder="Street Name"
          />
          <TextField
            hiddenLabel
            id="filled-hidden-label-medium"
            value={streetNumber}
            onChange={(e: any) => setStreetNumber(e.target.value)}
            variant="outlined"
            size="medium"
            placeholder="Street Number"
          />
          <TextField
            hiddenLabel
            id="filled-hidden-label-medium"
            value={city}
            onChange={(e: any) => setCity(e.target.value)}
            variant="outlined"
            size="medium"
            placeholder="City"
          />
          <TextField
            hiddenLabel
            id="filled-hidden-label-medium"
            value={country}
            onChange={(e: any) => setCountry(e.target.value)}
            variant="outlined"
            size="medium"
            placeholder="Country"
          />
        </div>
        <div className="place-self-center w-full">
          <TextField
            hiddenLabel
            id="filled-hidden-label-medium"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            variant="outlined"
            size="medium"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="flex justify-center">
          <div className="text-red-500 h-6">{message}</div>
          <div className="text-green-500 h-6">{successMessage}</div>
        </div>
        <div className="flex gap-y-5 items-center flex-col md:flex-row justify-between">
          <Button type="submit" className="w-32" variant="contained">
            Save
          </Button>
          <Button onClick={handleClose} className="w-32" variant="contained">
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default UserEdit;
