import React from 'react'

import request from 'superagent'
import _ from 'lodash'

import { NavLink } from 'react-router-dom'
import Player from './components/player'

class Players extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [],
      loaded: false
    }

    this.remove = this.remove.bind(this);
    this.fetchPlayers = this.fetchPlayers.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem('token')) {
      this.fetchPlayers();
    }
  }

  fetchPlayers() {
    request
      .get('https://players-api.developer.alchemy.codes/api/players')
      .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`)
      .then(res => {
        this.setState({
          players: res.body.players,
          loaded: true
        })
      })
      .catch(err => {
        this.setState({
          error: true,
          error_message: err.response.body.error.message
        })
      });
  }

  remove(id) {
    request
      .delete(`https://players-api.developer.alchemy.codes/api/players/${id}`)
      .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`)
      .then(res => {
        if (res.body.success) {
          this.fetchPlayers();
        }
      })
      .catch(err => {
        this.setState({
          error: true,
          error_message: err.response.body.error.message
        })
      });
  }

  render() {
    let players = this.state.players;
    return (
      <React.Fragment>
        <h1>Avengers Roster</h1>
        { _.isEmpty(players) && !this.state.loaded &&
          <h2>Loading Players...</h2>
        }
        { !_.isEmpty(players) &&
          <ul className='players'>
            {
              _.map(players, (player)=> {
                return (
                  <Player
                    key={ player.id }
                    player={ player }
                    remove={ () => { this.remove(player.id) } }
                  />
                )
              })
            }
          </ul>
        }
        { _.isEmpty(players) && this.state.loaded &&
          <React.Fragment>
            <h2>This team is currently empty. Just like Thor's eye socket.</h2>
            <NavLink className='btn' to='/manage'>Would you like to add Avengers?</NavLink>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

export default Players;
