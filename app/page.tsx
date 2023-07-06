import UserList from './components/user-list';
import NewUserForm from './components/NewUserForm';
import { RequestUserProps } from './types';

export const metadata = {
  title: ' Users library',
  description: 'Home page',
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
    <main className="flex flex-col min-h-screen p-5 font-sans lg:py-24 lg:px-0 gap-y-10 items-center">
      <h1 className="text-3xl md:text-5xl text-blue-950">The Users Library</h1>
      <UserList users={users} />
      <NewUserForm />
    </main>
  );
}
