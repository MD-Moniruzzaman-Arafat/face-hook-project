import homeIcon from '../../assets/icons/home.svg';
import logOutIcon from '../../assets/icons/logout.svg';
import notificationIcon from '../../assets/icons/notification.svg';
import avatarIcon from '../../assets/images/avatars/avatar_1.png';
import logo from '../../assets/images/logo.svg';

export default function Navbar() {
  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* <!-- Logo --> */}
          <a href="./index.html">
            <img
              className="max-w-[100px] rounded-full lg:max-w-[130px]"
              src={logo}
              alt="LWS"
            />
          </a>
          {/* <!-- nav links  --> */}

          <div className="flex items-center space-x-4">
            <a href="./index.html" className="btn-primary">
              <img src={homeIcon} alt="Home" />
              Home
            </a>
            <button className="icon-btn">
              <img src={notificationIcon} alt="Notification" />
            </button>
            <button className="icon-btn">
              <img src={logOutIcon} alt="Logout" />
            </button>

            <button className="flex-center !ml-8 gap-3">
              <span className="text-lg font-medium lg:text-xl">Sumit</span>
              <img
                className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
                src={avatarIcon}
                alt="avatar"
              />
            </button>
          </div>
          {/* <!-- nav links ends --> */}
        </div>
      </nav>
    </>
  );
}
