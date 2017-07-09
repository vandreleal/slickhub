import React, { Component } from 'react';
import { MuiThemeProvider, withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { LabelRadio, RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl } from 'material-ui/Form';
import GithubRepositories from './components/GithubRepositories/GithubRepositories';

import logo from './logo.svg';
import './App.css';

const styleSheet = createStyleSheet('FullWidthGrid', theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  }
}));

class App extends Component {
  state = {
    criteria: 'created',
    sort: 'stars',
    order: 'desc',
    interval: 'today'
  };

  handleChange = (name, event, key, value) => {
    this.setState({ name: value });
  };

  render() {
    const classes = this.props.classes;

    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <div>
              <Grid container gutter={16}>
                <Grid item xs={12} sm={4} md={3} lg={3}>
                  <img src={logo} className="App-logo" alt="logo" />
                  <h2>Github Explorer</h2>
                </Grid>

                <Grid item xs={12} sm={4} md={2} lg={2}>
                  <FormControl>
                    <RadioGroup
                      aria-label="Criteria"
                      name="criteria"
                      selectedValue={this.state.criteria}
                      onChange={this.handleChange.bind(this, 'criteria')}
                    >
                      <LabelRadio label="Created" value="created" />
                      <LabelRadio label="Pushed" value="pushed" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4} md={2} lg={2}>
                  <FormControl>
                    <RadioGroup
                      aria-label="Sort"
                      name="sort"
                      selectedValue={this.state.sort}
                      onChange={this.handleChange}
                    >
                      <LabelRadio label="Stars" value="stars" />
                      <LabelRadio label="Forks" value="forks" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4} md={2} lg={2}>
                  <FormControl>
                    <RadioGroup
                      aria-label="Order"
                      name="order"
                      selectedValue={this.state.order}
                      onChange={this.handleChange}
                    >
                      <LabelRadio label="Desc" value="desc" />
                      <LabelRadio label="Asc" value="asc" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4} md={2} lg={2}>
                  <FormControl>
                    <RadioGroup
                      aria-label="Interval"
                      name="interval"
                      selectedValue={this.state.interval}
                      onChange={this.handleChange}
                    >
                      <LabelRadio label="Today" value="today" />
                      <LabelRadio label="This Week" value="this_week" />
                      <LabelRadio label="This Month" value="this_month" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

              </Grid>
            </div>
          </div>

          <GithubRepositories criteria={this.state.criteria} sort={this.state.sort} order={this.state.order} interval={this.state.interval} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
