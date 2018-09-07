import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './login'
import Players from './players'
import Admin from './admin'
import New from './new'

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={ Login } />
        <Route exact path='/roster' component={ Players } />
        <Route exact path='/manage' component={ Admin } />
        <Route exact path='/new' component={ New } />
      </Switch>
    )
  }
}

export default Main;
