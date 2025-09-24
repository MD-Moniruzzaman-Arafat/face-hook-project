import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';

export default function Root() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1020px] py-8">
        <Outlet />
      </main>
    </>
  );
}
