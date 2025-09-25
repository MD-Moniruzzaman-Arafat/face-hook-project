import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import ProfileProvider from '../Provider/ProfileProvider';

export default function Root() {
  return (
    <>
      <ProfileProvider>
        <Navbar />
        <main className="mx-auto max-w-[1020px] py-8">
          <Outlet />
        </main>
      </ProfileProvider>
    </>
  );
}
