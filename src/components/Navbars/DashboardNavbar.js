import React from 'react';
import { Link } from 'react-router-dom';

const isMvp = process.env.REACT_APP_MVP_SETTING === 'true';

const logout = () => {
  localStorage.removeItem('token')
}

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="w-full z-10 bg-dark-grey md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
        {/* Left side */}
        <div className="width-75 mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <Link
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            to={{
              pathname: '/measures/',
            }}
          >
            Saraswati
          </Link>
        </div>
        {/* Right side */}
        <div className="mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <div className="mx-4">
            <Link
              className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
              to={{ pathname: '/' }}
            >
              Dashboard
            </Link>
          </div>
          {isMvp
            ? (
              <div className="mx-4">
                <Link
                  className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                  to={{ pathname: '/measures/' }}
                >
                  Reports
                </Link>
              </div>
            )
            : null}
          <div className="mx-4">
            <Link
              className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
              to={{ pathname: '/auth/login' }}
              onClick={logout}
            >
              Sign Out
            </Link>
          </div>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
