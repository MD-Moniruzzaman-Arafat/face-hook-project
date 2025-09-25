import { Link } from 'react-router';
import homeIcon from '../../assets/icons/home.svg';
import notificationIcon from '../../assets/icons/notification.svg';
import avatarIcon from '../../assets/images/avatars/avatar_1.png';
import logo from '../../assets/images/logo.svg';
import useAuth from '../../hooks/useAuth';
import LogOut from '../LogOut/LogOut';

export default function Navbar() {
  const { auth } = useAuth();
  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
        <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* <!-- Logo --> */}
          <Link to={'/'}>
            <img
              className="max-w-[100px] rounded-full lg:max-w-[130px]"
              src={logo}
              alt="LWS"
            />
          </Link>
          {/* <!-- nav links  --> */}

          <div className="flex items-center space-x-4">
            <Link to={'/'} className="btn-primary">
              <img src={homeIcon} alt="Home" />
              Home
            </Link>
            <button className="icon-btn">
              <img src={notificationIcon} alt="Notification" />
            </button>
            <LogOut />

            <button className="flex-center !ml-8 gap-3">
              <span className="text-lg font-medium lg:text-xl">
                {auth?.user?.firstName} {auth?.user?.lastName}
              </span>
              <Link to={'/profile'}>
                <img
                  className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
                  src={avatarIcon}
                  alt="avatar"
                />
              </Link>
            </button>
          </div>
          {/* <!-- nav links ends --> */}
        </div>
      </nav>
    </>
  );
}
