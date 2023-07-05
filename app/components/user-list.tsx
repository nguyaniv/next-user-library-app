'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import UserEdit from './user-edit';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../features/usersSlice';
import Button from '@mui/material/Button';
import ConfirmDelete from './confim-delete';
import { Input } from '@mui/material';
import { ShortRequestUserProps } from '../types';

const withPeriod: any[] = ['Mr', 'Ms', 'Mrs'];

const UserCard = ({
  user,
  openEdit,
  onSetIsAlert,
}: {
  user: ShortRequestUserProps;
  openEdit: Function;
  onSetIsAlert: Function;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { name, userImage, email, location, uuid } = user;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border shadow-xl grid rounded-xl py-5 bg-slate-50 gap-y-20 max-w-[23rem] w-full cursor-pointer relative"
    >
      <div
        className={`absolute transition-all rounded-xl  duration-500
          grid place-items-center text-yellow-50 text-bold text-2xl
         ${
           isHovered ? 'z-50 bg-opacity-60' : '-z-50 opacity-0'
         } w-full h-full  bg-black`}
      >
        <div className="flex justify-between gap-x-5">
          <Button
            onClick={() => openEdit(user)}
            className="!bg-green-500 hover:!bg-green-600 !text-white !border-green-600"
            variant="outlined"
          >
            Edit
          </Button>
          <Button
            onClick={async () => onSetIsAlert(user)}
            className="!bg-red-500 hover:!bg-red-600 !text-white !border-red-600"
            variant="contained"
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="text-center text-xl grid bg-gray-600 text-yellow-50 ">
        <div className="">
          {name?.title}
          {withPeriod.includes(name?.title) ? '.' : ''} {name?.last}
        </div>
        <div className="font-bold"> {name?.first}</div>
      </div>
      <div className="place-self-center absolute top-1/2 -translate-y-1/2 -mt-5 ">
        <Image
          className="rounded-full border border-gray-300 "
          alt={`${name?.first} ${name?.last}`}
          src={userImage}
          width={150}
          height={200}
        />
      </div>

      <div className="grid bg-white text-yellow-50 px-5 gap-y-3 py-2 mt-28">
        <div className="bg-gray-600 px-2 rounded-md">
          First Name: {name?.first}
        </div>
        <div className="bg-gray-600 px-2 rounded-md">
          Last Name: {name?.last}
        </div>
        <div className="bg-gray-600 px-2 rounded-md">Email: {email}</div>
      </div>
    </div>
  );
};

function UserList({ users }: { users: ShortRequestUserProps[] }) {
  const [selectedUser, setSelectedUser] = useState<ShortRequestUserProps | {}>(
    {}
  );
  const [open, setOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const storeUsers = useSelector((state: any) => state.users.users);
  const dispatch = useDispatch();

  const openEdit = (user: ShortRequestUserProps) => {
    setOpen(true);
    setSelectedUser(user);
  };

  const onSetIsAlert = (user: ShortRequestUserProps) => {
    setIsAlert(true);
    setSelectedUser(user);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(setUsers(users));
  }, []);

  return (
    <section className="grid">
      <div>
        <Input
          className="w-full my-4"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>

      <div className="grid md:grid-cols-2 place-items-center max-w-4xl w-full gap-x-5 gap-y-10">
        {storeUsers
          .filter((user: ShortRequestUserProps) => {
            const { name, email, uuid, location } = user;
            const fullName = `${name?.first} ${name?.last}`.toLowerCase();
            const lowerCaseSearchQuery = searchQuery.toLowerCase();

            return (
              fullName.includes(lowerCaseSearchQuery) ||
              email?.toLowerCase().includes(lowerCaseSearchQuery) ||
              uuid?.toLowerCase().includes(lowerCaseSearchQuery) ||
              location?.country?.toLowerCase().includes(lowerCaseSearchQuery) ||
              location?.city?.toLowerCase().includes(lowerCaseSearchQuery)
            );
          })
          .map((user: ShortRequestUserProps) => (
            <UserCard
              onSetIsAlert={onSetIsAlert}
              openEdit={openEdit}
              key={user.uuid}
              user={user}
            />
          ))}

        <UserEdit
          selectedUser={selectedUser}
          handleClose={handleClose}
          open={open}
        />

        <ConfirmDelete
          selectedUser={selectedUser}
          isAlert={isAlert}
          setIsAlert={setIsAlert}
        />
      </div>
    </section>
  );
}

export default UserList;
