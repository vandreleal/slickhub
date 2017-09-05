import React, { Component } from 'react';
import Slider from 'react-slick';
import { Github } from 'react-social-github';

import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import './GithubRepositories.css';

class GithubRepositories extends Component {

  constructor() {
    super();

    this.config = {
      query: '',
      criteria: 'pushed',
      sort: 'stars',
      order: 'desc',
      interval: 'today',
      limit: 25
    };

    this.state = {
      isLoading: true,
      repos: []
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

  componentWillMount() {
    window.fetch('https://api.github.com/search/repositories?q=' + this.config.query + this.config.criteria + ':>=' + this.getDate(this.config.interval) + '&sort=' + this.config.sort + '&order=' + this.config.order + '&per_page=' + this.config.limit)
      .then(response => {
        return response.json()
      }).then(json => {
        if(this.closing) return;

        if(!json.message) {
          this.setState({
            isLoading: false,
            repos: json.items || {},
          });
        }

      }).catch(ex => {
        this.setState({
          isLoading: false
        });
        throw ex;
      });
  }

  componentWillReceiveProps(props) {
    let query = typeof props.query === 'string' ? props.query + '+' : this.config.query;
    let criteria = typeof props.criteria === 'string' ? props.criteria : this.config.criteria;
    let sort = typeof props.sort === 'string' ? props.sort : this.config.sort;
    let order = typeof props.order === 'string' ? props.order : this.config.order;
    let interval = typeof props.interval === 'string' ? this.getDate(props.interval) : this.getDate(this.config.interval);
    let limit = typeof props.limit === 'number' ? props.limit : this.config.limit;

    window.fetch('https://api.github.com/search/repositories?q=' + query + criteria + ':>=' + interval + '&sort=' + sort + '&order=' + order + '&per_page=' + limit)
      .then(response => {
        return response.json()
      }).then(json => {
        if(this.closing) return;

        if(!json.message) {
          this.setState({
            repos: json.items || {}
          });
        }

      }).catch(ex => {
        throw ex;
      });
  }

  render() {
    if(this.state.isLoading) { }

    let repos = this.state.repos.map(function(value, key){
      return (
        <div key={key}>
          <h2 className="rsg-index">{key + 1}</h2>
          <Github key={key} objRepo={value} />
        </div>
      );
    });

    let settings = {
      arrows: false,
      dots: true,
      infinite: true,
      initialSlide: 1,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 5000,
      variableWidth: true,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: 1455,
          settings: {
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 1190,
          settings: {
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 925,
          settings: {
            arrows: true,
            dots: false,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 660,
          settings: {
            arrows: true,
            dots: false,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 568,
          settings: "unslick"
        }
      ]
    };

    return (
      <Slider {...settings} className="slick-github">
          { repos }
      </Slider>
    );
  }
}

export default GithubRepositories;
