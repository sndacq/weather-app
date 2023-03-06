import { useEffect } from 'react';
import { useAuth0, LogoutOptions } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { setAuthState, setUserState } from '@/store/authSlice';
import NavBar from '@/components/NavBar';
import Weather from '@/components/Weather';

const Home = () => {
  const dispatch = useDispatch();

  let returnTo = '';
  if (typeof window !== 'undefined') {
    returnTo = window.location.origin;
  }

  const {
    isLoading, isAuthenticated, error, user, loginWithRedirect, logout,
  } = useAuth0();

  useEffect(() => {
    dispatch(setAuthState(isAuthenticated));
    dispatch(setUserState(user));
  }, [user, isAuthenticated]);

  const gitUserLink = `https://github.com/${user?.nickname}`;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        Oops...
        {error.message}
      </div>
    );
  }

  return (
    <>
      <NavBar logout={() => logout({ returnTo } as LogoutOptions)} />
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl space-y-8">
          {!isAuthenticated ? (
            <>
              <div>
                <h5 className="mt-6 text-lg tracking-tight text-gray-900">Welcome to the weather forecast web application. Please login with your Github user to use the application and view the weather in your city.</h5>
              </div>
              <div className="mt-10 flex items-center justify-start gap-x-6">
                <button
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  type="submit"
                  onClick={() => loginWithRedirect()}
                >
                  Login
                </button>
              </div>
            </>
          ) : (
            <div className="mt-10 flex-col items-end justify-center gap-x-6">
              <div className="text-center">{user?.name}</div>
              <div className="text-center mb-4">
                <a href={gitUserLink} target="_blank" rel="noreferrer">{gitUserLink}</a>
              </div>
              <Weather />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
