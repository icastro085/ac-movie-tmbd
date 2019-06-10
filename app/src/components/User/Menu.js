import React from 'react';
import gapi from 'gapi';

const signOut = () => {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    window.location.reload(true);
  });
}

const Menu = () => (
  <ul className="user-menu position-relative">
    <li className="d-flex">
      <a className="d-block w-100" href="#/user">
        Profile
      </a>
    </li>
    <li className="d-flex">
      <a className="d-block w-100" href="#/user/address">
        Address
      </a>
    </li>

    <li className="logout" onClick={signOut}>
      Sign Out <i className="fas fa-sign-out-alt" />
    </li>
  </ul>
);

export default Menu;
