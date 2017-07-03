import React, { Component } from 'react';
import { Github } from 'react-social-github';
import './GithubTrendingRepos.css';

// const trending_repos = require('./mock/trending_repos.json');

class GithubTrendingRepos extends Component {

  constructor() {
    super();

    this.state = {
      isLoading: true,
      repos: {}
    };

    this.closing = false;
  }

  componentWillUnmount() {
    this.closing = true;
  }

  componentDidMount() {
    let sort = typeof this.props.sort === 'string' ? this.props.sort : 'stars';
    let order = typeof this.props.order === 'string' ? this.props.order : 'desc';

    window.fetch('https://api.github.com/search/repositories?q=pushed:>2017-06-27&sort=' + sort + '&order=' + order)
      .then(response => {
        return response.json()
      }).then(json => {
        if(this.closing) return;

        if(!json.message) {
          this.setState({
            repos: json.items || {}
          });
        }

        this.setState({
          isLoading: false
        });

      }).catch(ex => {
        this.setState({
          isLoading: false
        });
        throw ex;
      });
  }

  mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
    });
  }

  render() {
    if(this.state.isLoading) { }

    return (
      <div className="gtr">
        { this.mapObject(this.state.repos, function (key, value) {
          return <Github key={key} objRepo={value} />;
        })}
      </div>
    );
  }
}

export default GithubTrendingRepos;
