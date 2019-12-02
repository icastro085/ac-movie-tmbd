import React, { Fragment } from 'react';

const Profile = ({ picture, name }) => (
  <Fragment>
    <h1 className="text-center">Welcome!</h1>
    <div className="text-center mt-5">
      <img src={picture} className="rounded" alt="Photo" />
    </div>
    <p className="text-center mt-3">
      {name}
    </p>
  </Fragment>
);

export default Profile;
