import { useNavigate } from 'react-router';
import logOutIcon from '../../assets/icons/logout.svg';

export default function LogOut() {
  const navigate = useNavigate();

  function handleLogOut() {
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
