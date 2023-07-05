import { Button } from '@mui/material';
import { store } from '.';
import UserList from './components/user-list';
import { setUsers } from './features/usersSlice';
import NewUserForm from './components/NewUserForm';

export const metadata = {
  title: ' Users library',
  description: 'Home page',
};

type RequestUserProps = {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  userImage: string;
  location: {
    street: {
      number: number;
      name: string;
    };
    country: string;
    city: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  picture: {
    thumbnail: string;
    medium: string;
    large: string;
  };
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
};

const getRandomUsers = async () => {
  const req = await fetch(`https://randomuser.me/api/?results=10`);
  const { results } = await req.json();
  const newUsers = results.map(
    ({ name, picture, location, email, login }: RequestUserProps) => {
      return {
        name: {
          title: name?.title,
          first: name?.first,
          last: name?.last,
        },
        email: email,
        userImage: picture?.medium,
        location: {
          country: location.country,
          city: location.city,
          street: location.street,
        },
        uuid: login?.uuid,
      };
    }
  );
  return JSON.parse(JSON.stringify(newUsers));
};

export default async function Home() {
  const users: any = await getRandomUsers();

  return (
    <main className="flex flex-col min-h-screen p-5 lg:p-24 gap-y-10 items-center">
      {/* Search */}
      <h1 className="text-5xl">The Users Library</h1>
      <UserList users={users} />
      <NewUserForm />
    </main>
  );
}
