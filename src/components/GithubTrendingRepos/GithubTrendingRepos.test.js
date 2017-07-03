import React from 'react';
import ReactDOM from 'react-dom';
import GithubTrendingRepos from './GithubTrendingRepos';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GithubTrendingRepos />, div);
});
