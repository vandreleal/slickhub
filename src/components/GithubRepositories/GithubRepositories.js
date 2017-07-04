import React, { Component } from 'react';
import { Github } from 'react-social-github';
import './GithubRepositories.css';

// const repositories = require('./mock/repositories.json');

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

  formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

  getDate(interval) {
    let now = new Date(),
        date = '';

    switch (interval) {
      case 'today':
          date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
          break;
      case 'this_week':
          now.setDate(now.getDate() - 7);
          date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
          break;
      case 'this_month':
          date = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate();
          break;
      case 'this_year':
          date = (now.getFullYear() - 1) + '-' + (now.getMonth() + 1) + '-' + now.getDate();
          break;
      default:
          date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    }

    return this.formatDate(date);
  }

  componentDidMount() {
    let query = typeof this.props.query === 'string' ? this.props.query + '+' : '';
    let criteria = typeof this.props.criteria === 'string' ? this.props.criteria : 'created';
    let interval = typeof this.props.interval === 'string' ? this.getDate(this.props.interval) : this.getDate('this_week');
    let sort = typeof this.props.sort === 'string' ? this.props.sort : 'stars';
    let order = typeof this.props.order === 'string' ? this.props.order : 'desc';

    window.fetch('https://api.github.com/search/repositories?q=' + query + criteria + ':>=' + interval + '&sort=' + sort + '&order=' + order + '&per_page=50')
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
