import React from 'react';

const Menu = () => (
  <ul className="user-menu">
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
  </ul>
);

export default Menu;
