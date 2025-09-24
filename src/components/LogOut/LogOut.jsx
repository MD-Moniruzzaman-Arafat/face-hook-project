import { useNavigate } from 'react-router';
import logOutIcon from '../../assets/icons/logout.svg';
import useAuth from '../../hooks/useAuth';

export default function LogOut() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  function handleLogOut() {
    setAuth({});
    navigate('/login');
  }
  return (
    <>
      <button className="icon-btn" onClick={handleLogOut}>
        <img src={logOutIcon} alt="Logout" />
      </button>
    </>
  );
}
