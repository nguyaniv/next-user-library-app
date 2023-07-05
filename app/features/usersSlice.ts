import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UsersState {
  value: number;
  users: any[];
}

const initialState: UsersState = {
  value: 0,
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<any>) => {
      state.users = [...state.users, action.payload];
    },
    editUser: (state: UsersState, action: PayloadAction<any>) => {
      const {
        title,
        email,
        firstName,
        lastName,
        streetName,
        streetNumber,
        city,
        country,
        uuid,
      } = action.payload;
      const updatedUsers = state.users.map((user) => {
        if (user.uuid === uuid) {
          return {
            ...user,
            name: {
              ...user.name,
              title,
              first: firstName,
              last: lastName,
              location: {
                city,
                country,
                street: streetName,
                streetNumber,
              },
            },
            email,
          };
        }
        return user;
      });
      state.users = updatedUsers;
    },

    deleteUser: (
      state: UsersState,
      action: PayloadAction<string | undefined>
    ) => {
      const uuid = action.payload;
      state.users = state.users.filter((user) => user.uuid !== uuid);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsers, editUser, deleteUser, addUser } = usersSlice.actions;

export default usersSlice.reducer;
