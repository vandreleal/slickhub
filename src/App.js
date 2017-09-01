import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import GithubRepositories from './components/GithubRepositories/GithubRepositories';

import './App.css';

import { blue700, blue400, grey300, lightBlue300, lightBlue200, lightBlue100, darkBlack, fullBlack } from 'material-ui/styles/colors';
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue700,
    primary2Color: blue400,
    primary3Color: grey300,
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
  { value: 'asc', label: 'Asc' },
  { value: 'desc', label: 'Desc' }
];

const interval = [
  { value: 'today', label: 'Today' },
  { value: 'this_week', label: 'This Week' },
  { value: 'this_month', label: 'This Month' },
  { value: 'this_year', label: 'This Year' }
];

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      criteria: 'created',
      sort: 'stars',
      order: 'desc',
      interval: 'today'
    };
  }

  handleChange(name, event, key, value) {
    this.setState({[name]: value});
  };

  render() {
    let repos = <GithubRepositories { ...this.state }> </GithubRepositories>;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <div className="App-header">
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
          </div>

          <div className="preview">
            { repos }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
