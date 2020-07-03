import React, { Component } from 'react';
import { robots } from '../../robots'
import './App.css';
// COMPONENTS
import CardList from '../card-list/CardList'
import SearchBox from '../../components/search-box/SearchBox'
import Scroll from '../../components/scroll/Scroll'
import ErrorBoundrys from '../../components/error-boundry/ErrorBoundry'

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield:'',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({ robots : users}))

  }

  onSearchChange = (event) => {
    this.setState({ searchfield : event.target.value });    
  }

  render() {
    const filteredRobots = this.state.robots.filter( robot => {
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })
    return (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundrys>
            <CardList robots={filteredRobots} />
          </ErrorBoundrys>          
        </Scroll>        
      </div>
    )
  }  
}

export default App;