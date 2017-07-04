import React from 'react';
import ReactDOM from 'react-dom';
import GithubRepositories from './GithubRepositories';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GithubRepositories />, div);
});
