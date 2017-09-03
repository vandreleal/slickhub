import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
// import Divider from 'material-ui/Divider';
// import SelectField from 'material-ui/SelectField';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { SettingsIcon } from 'react-octicons';

import {
  indigo700,
  indigo500,
  indigo300,
  lightBlue300,
  lightBlue200,
  lightBlue100,
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
    accent1Color: lightBlue300,
    accent2Color: lightBlue200,
    accent3Color: lightBlue100,
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

  render() {
    let repos = <GithubRepositories { ...this.state }> </GithubRepositories>;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <AppBar
            className="app-bar"
            showMenuIconButton={false}
            title="Gitty"
            iconElementRight={
              <IconMenu
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
            <h1 className="app-header--description">
              You are viewing repositories that were { this.state.criteria } { this.state.interval } sortered by { this.state.sort } in { this.state.order } order
            </h1>
          </div>

          {/* <div className="app-header">
            <div>
                <SelectField
                  floatingLabelText="Criteria"
                  value={this.state.criteria}
                  onChange={this.handleChange.bind(this, 'criteria')}
                >
                {
                  criteria.map((obj, index) => {
                      return <MenuItem value={obj.value} primaryText={obj.label} key={index} />;
                  })
                }
                </SelectField>
            </div>

            <div>
                <SelectField
                  floatingLabelText="Sort"
                  value={this.state.sort}
                  onChange={this.handleChange.bind(this, 'sort')}
                >
                {
                  sort.map((obj, index) => {
                      return <MenuItem value={obj.value} primaryText={obj.label} key={index} />;
                  })
                }
                </SelectField>
            </div>

            <div>
                <SelectField
                  floatingLabelText="Order"
                  value={this.state.order}
                  onChange={this.handleChange.bind(this, 'order')}
                >
                {
                  order.map((obj, index) => {
                      return <MenuItem value={obj.value} primaryText={obj.label} key={index} />;
                  })
                }
                </SelectField>
            </div>

            <div>
                <SelectField
                  floatingLabelText="Interval"
                  value={this.state.interval}
                  onChange={this.handleChange.bind(this, 'interval')}
                >
                {
                  interval.map((obj, index) => {
                      return <MenuItem value={obj.value} primaryText={obj.label} key={index} />;
                  })
                }
                </SelectField>
            </div>
          </div> */}

          <div className="app-preview">
            { repos }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
