import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthState } from '@/store/authSlice';

interface INavBarProps {
  logout: () => void;
}

const NavBar:FC<INavBarProps> = ({ logout }) => {
  const authState = useSelector(selectAuthState);

  return (
    <nav className="px-2 bg-blue-700 border-gray-200">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center h-12">
          <span className="self-center text-xl text-white font-semibold">Weather Forecast</span>
        </a>
        {authState && (
          <button
            className="mr-2 text-blue-700 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
            type="button"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
