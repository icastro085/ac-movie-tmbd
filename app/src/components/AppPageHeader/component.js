import React from 'react';
import SearchInput from './SearchInput';

const AppPageHeader = ({ title }) => (
  <header className="header">
    <div className="container content justify-content-between">
      <p className="h1">
        <a href="/#/">
          <i className="fas fa-film mr-2" />
        </a>
        {title}
      </p>

      <SearchInput />
    </div>
  </header>
);

export default AppPageHeader;
