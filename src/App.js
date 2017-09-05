import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
// import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { SettingsIcon } from 'react-octicons';
import { SearchIcon } from 'react-octicons';
// import { Github } from 'react-social-github';

import {
  indigo700,
  indigo500,
  indigo300,
  blue500,
  blue300,
  blue100,
  darkBlack,
  fullBlack
} from 'material-ui/styles/colors';

import GithubRepositories from './components/GithubRepositories/GithubRepositories';
import './App.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo700,
    primary2Color: indigo500,
    primary3Color: indigo300,
    accent1Color: blue500,
    accent2Color: blue300,
    accent3Color: blue100,
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
  { value: 'forks', label: 'Forks' },
  { value: 'updated', label: 'Updated' }
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

const styles = {
  margin: 12,
  smallIcon: {
    width: 36,
    height: 36,
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      criteria: 'pushed',
      sort: 'stars',
      order: 'desc',
      interval: 'today'
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
            title="Github Explorer"
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
              <div className="pure-u-2-24 app-filter--icon">
                <SettingsIcon />
              </div>
              <div className="pure-u-5-24">
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

              <div className="pure-u-5-24">
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

              <div className="pure-u-5-24">
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

              <div className="pure-u-5-24">
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

              <div className="pure-u-2-24">
              {/*  <RaisedButton label="Update" primary={true} style={styles} /> */}
                <IconButton
                  iconStyle={styles.smallIcon}
                  style={styles.small}
                  onClick={this.update.bind(this)}
                >
                  <SearchIcon />
                </IconButton>
              </div>
            </div>

            <h1 className="pure-g app-header--description">
              <div className="pure-u pure-u-lg-3-5 headline">
                These are the repositories that were { this.state.criteria } { this.state.interval.replace('_', ' ') } sortered by { this.state.sort } in { this.state.order } order.
              </div>
            </h1>
          </div>

          <div className="app-content">
            { repos }
          </div>

          {/* }<Github
            fab={true}
            repo="github-trending-repositories"
            user="vandreleal"
            tooltipOnHover={true}
            type="button"
          >
          </Github> */}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
