'use client';
import { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/usersSlice';
import { generate_uuidv4 } from '../lib/helpers';
import { validateImage } from 'image-validator';
import { validationAddUserSchema } from '../lib/validates';

type Props = {};

function NewUserForm({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
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
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const onAddUser = async (e: any) => {
    e.preventDefault();
    const isValidImage = await validateImage(image);
    if (!isValidImage) {
      setMesssage('Invalid image url');
      setTimeout(() => {
        setMesssage('');
      }, 3000);
      return;
    }
    try {
      const isValid = await validationAddUserSchema.validate({
        title,
        email,
        firstName,
        lastName,
        streetName,
        streetNumber,
        city,
        country,
        image,
      });

      if (isValid) {
        const uuid = generate_uuidv4();
        dispatch(
          await addUser({
            email,
            location: {
              city,
              country,
              street: {
                name: streetName,
                number: streetNumber,
              },
            },
            name: {
              first: firstName,
              last: lastName,
              title: title,
            },
            userImage: image,
            uuid,
          })
        );
        setSuccessMessage('Added user successfully');
        setTimeout(() => {
          setSuccessMessage('');
          setIsOpen(false);
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
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 rounded-lg border border-slate-700
       text-white bg-green-500 hover:bg-green-600 px-5 py-2"
      >
        Add user
      </button>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="grid place-items-center "
      >
        <form
          onSubmit={onAddUser}
          className="border px-20 lg:w-full max-w-3xl py-10 border-yellow-50  grid bg-white gap-y-10 "
        >
          <h3 className="text-2xl text-center">Add new user</h3>
          <div className="grid ">
            <TextField
              id="filled-hidden-label-medium"
              value={image}
              onChange={(e: any) => setImage(e.target.value)}
              variant="outlined"
              size="medium"
              placeholder="Image Url"
            />
          </div>

          <div className="grid gap-y-5  md:grid-flow-col  md:gap-x-5">
            {
              <div className="grid ">
                <TextField
                  hiddenLabel
                  id="filled-hidden-label-medium"
                  value={title}
                  onChange={(e: any) => setTitle(e.target.value)}
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
              Add User
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              className="w-32"
              variant="contained"
            >
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default NewUserForm;
