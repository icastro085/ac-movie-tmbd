import React from 'react';
import SearchInput from './SearchInput';

const AppPageHeader = ({ title }) => (
  <header className="header">
    <div className="container content justify-content-between">
      <p className="h1">
        <i className="fas fa-film mr-2" />
        {title}
      </p>

      <SearchInput />
    </div>
  </header>
);

export default AppPageHeader;
