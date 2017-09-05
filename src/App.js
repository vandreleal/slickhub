import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import SelectField from 'material-ui/SelectField';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { SettingsIcon } from 'react-octicons';

import {
  grey900,
  grey700,
  grey500,
  blueGrey500,
  blueGrey300,
  blueGrey100,
  darkBlack,
  fullBlack
} from 'material-ui/styles/colors';

import GithubRepositories from './components/GithubRepositories/GithubRepositories';
import './App.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey900,
    primary2Color: grey700,
    primary3Color: grey500,
    accent1Color: blueGrey500,
    accent2Color: blueGrey300,
    accent3Color: blueGrey100,
    textColor: darkBlack,
    shadowColor: fullBlack
  }
});

const criteria = [
  { value: 'created', label: 'Created' },
  { value: 'pushed', label: 'Pushed' }
];

const sort = [
  { value: 'stars', label: 'Stars' },
  { value: 'forks', label: 'Forks' }
];

const order = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' }
];

const interval = [
  { value: 'today', label: 'Today' },
  { value: 'this_week', label: 'This Week' },
  { value: 'this_month', label: 'This Month' }
];

const limit = [
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' }
];

class App extends Component {

  constructor(props) {
    super(props);

    this.config = {
      app: {
        name: 'Github Explorer',
        year: new Date().getFullYear(),
        author: 'Vandré Leal',
        author_url: 'https://vandreleal.github.io'
      }
    }

    this.state = {
      criteria: 'pushed',
      sort: 'stars',
      order: 'desc',
      interval: 'today',
      limit: 25
    };
  }

  handleChange(name, value) {
    this.setState({[name]: value});
  };

  handleSelectChange(name, event, key, value) {
    this.setState({[name]: value});
  };

  update() {
    this.setState(this.config);
  }

  render() {
    let repos = <GithubRepositories { ...this.state }> </GithubRepositories>;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="app">
          <AppBar
            className="app-bar"
            showMenuIconButton={false}
            title={this.config.app.name}
            iconElementRight={
              <IconMenu
                className="app-bar--options"
                iconButtonElement={<IconButton><SettingsIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
              >

                <MenuItem
                  primaryText="Criteria"
                  rightIcon={<ArrowDropRight />}
                  menuItems={[
                    criteria.map((obj, index) => {
                        return <MenuItem value={obj.value} primaryText={obj.label} key={index} onClick={ this.handleChange.bind(this, 'criteria', obj.value) } />;
                    })
                  ]}
                />

                <MenuItem
                  primaryText="Sort"
                  rightIcon={<ArrowDropRight />}
                  menuItems={[
                    sort.map((obj, index) => {
                        return <MenuItem value={obj.value} primaryText={obj.label} key={index} onClick={this.handleChange.bind(this, 'sort', obj.value)} />;
                    })
                  ]}
                />

                <MenuItem
                  primaryText="Order"
                  rightIcon={<ArrowDropRight />}
                  menuItems={[
                    order.map((obj, index) => {
                        return <MenuItem value={obj.value} primaryText={obj.label} key={index} onClick={this.handleChange.bind(this, 'order', obj.value)} />;
                    })
                  ]}
                />

                <MenuItem
                  primaryText="Interval"
                  rightIcon={<ArrowDropRight />}
                  menuItems={[
                    interval.map((obj, index) => {
                        return <MenuItem value={obj.value} primaryText={obj.label} key={index} onClick={this.handleChange.bind(this, 'interval', obj.value)} />;
                    })
                  ]}
                />

              </IconMenu>
            }
          />

          <div className="app-header">
            <div className="pure-g app-filter">
              <div className="pure-u-1 pure-u-lg-2-24 app-filter--icon">
                <SettingsIcon />
              </div>
              <div className="pure-u-1-2 pure-u-lg-5-24">
                  <SelectField
                    className="app-filter--option"
                    floatingLabelText="Criteria"
                    value={this.state.criteria}
                    onChange={this.handleSelectChange.bind(this, 'criteria')}
                  >
                  {
                    criteria.map((obj, index) => {
                        return <MenuItem value={obj.value} primaryText={obj.label} key={index} />;
                    })
                  }
                  </SelectField>
              </div>

              <div className="pure-u-1-2 pure-u-lg-5-24">
                  <SelectField
                    className="app-filter--option"
                    floatingLabelText="Sort"
                    value={this.state.sort}
                    onChange={this.handleSelectChange.bind(this, 'sort')}
                  >
                  {
                    sort.map((obj, index) => {
                        return <MenuItem value={obj.value} primaryText={obj.label} key={index} />;
                    })
                  }
                  </SelectField>
              </div>

              <div className="pure-u-1-2 pure-u-lg-5-24">
                  <SelectField
                    className="app-filter--option"
                    floatingLabelText="Order"
                    value={this.state.order}
                    onChange={this.handleSelectChange.bind(this, 'order')}
                  >
                  {
                    order.map((obj, index) => {
                        return <MenuItem value={obj.value} primaryText={obj.label} key={index} />;
                    })
                  }
                  </SelectField>
              </div>

              <div className="pure-u-7-24 pure-u-lg-5-24">
                  <SelectField
                    className="app-filter--option"
                    floatingLabelText="Interval"
                    value={this.state.interval}
                    onChange={this.handleSelectChange.bind(this, 'interval')}
                  >
                  {
                    interval.map((obj, index) => {
                        return <MenuItem value={obj.value} primaryText={obj.label} key={index} />;
                    })
                  }
                  </SelectField>
              </div>

              <div className="pure-u-5-24 pure-u-lg-2-24">
                  <SelectField
                    className="app-filter--option"
                    floatingLabelText="Limit"
                    value={this.state.limit}
                    onChange={this.handleSelectChange.bind(this, 'limit')}
                  >
                  {
                    limit.map((obj, index) => {
                        return <MenuItem value={obj.value} primaryText={obj.label} key={index} />;
                    })
                  }
                  </SelectField>
              </div>
            </div>

            <h1 className="pure-g app-header--description">
              <div className="pure-u pure-u-lg-3-4 pure-u-xl-1-2 headline">
                These are the <span className="highlight">{ this.state.limit }</span> repositories <span className="highlight">{ this.state.criteria }</span> <span className="highlight">{ this.state.interval.replace('_', ' ') }</span> sortered by <span className="highlight">{ this.state.sort }</span> in <span className="highlight">{ this.state.order }</span> order
              </div>
            </h1>
          </div>

          <div className="app-content">
            { repos }
          </div>

          <div className="app-footer">
            <div>{this.config.app.name} © {this.config.app.year} <a href={this.config.app.author_url} target="_blank">{this.config.app.author}</a></div>
            <div>Made with React, Material UI and Github API</div>
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
