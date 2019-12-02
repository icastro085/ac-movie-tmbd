import React from 'react';

const Loading = ({ title }) => (
  <div className="d-flex justify-content-center loading flex-column">
    <p className="text-center">
      <img src={require('../img/ajax-loader.gif')} />
    </p>
  </div>
);

export default Loading;
