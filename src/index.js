import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Main from './main'
import Header from './components/header'

import './css/styles.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem('token')) {
      this.setState({
        authenticated: true
      })
    }
  }

  componentDidUpdate() {
    if (sessionStorage.getItem('token') && !this.state.authenticated) {
      this.setState({
        authenticated: true
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header
          authenticated={ this.state.authenticated }
        />
        <div className='content'>
          <Main />
        </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root')
);
