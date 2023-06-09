import React from 'react'
import { Link } from 'react-router-dom'

import Auth from '../../utils/auth'

import shangooIcon from '../../assets/images/shangoo-icon.png'

const Header = () => {
  const logout = (event) => {
    event.preventDefault()
    Auth.logout()
  }
  return (
    <header className="bg-yellowtext-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center ">
        <div>
          <Link className="text-dark " to="/">
            <h1 className="m-0" id='text-shadow' style={{ color: '#275CBA' }}>Shangoo <span><img src={shangooIcon}></img></span></h1>
          </Link>

          <p className="m-0 text-dark">
            Book your vaccinations and get your prescriptions!
          </p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-dark m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-light m-2" to="/info">
                Info
              </Link>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
