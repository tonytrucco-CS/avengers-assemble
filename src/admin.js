import React from 'react'

import request from 'superagent'
import _ from 'lodash'

import Message from './components/message'

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      rating: '',
      handedness: '',
      error: false,
      error_message: '',
      player: {}
    }

    this.inputChange = this.inputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
  }

  inputChange(event, hand) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: hand ? hand : value,
      error: false
    })
  }

  submit() {
    if (!this.state.first_name || !this.state.last_name || !this.state.rating || !this.state.handedness) {
      this.setState({
        error: true,
        error_message: 'You are missing one or more required fields'
      })
      return;
    }
    let body = JSON.stringify({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      rating: parseInt(this.state.rating, 10),
      handedness: this.state.handedness
    })

    this.addPlayer(body);
  }

  addPlayer(body) {
    if (body)
    request
      .post('https://players-api.developer.alchemy.codes/api/players')
      .send(body)
      .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`)
      .set('Content-Type', 'application/json')
      .then(res => {
        this.setState({
          player: res.body.player,
          first_name: '',
          last_name: '',
          rating: ''
        })
      })
      .catch(err => {
        this.setState({
          error: true,
          error_message: err.response.body.error.message
        })
      });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Add a New Avenger</h1>
        { this.state.error &&
          <Message
            type='error'
            message={ this.state.error_message }
          />
        }
        <label>First Name
          <input
            autoFocus
            type='text'
            name='first_name'
            value={ this.state.first_name }
            onChange={ this.inputChange }
          />
        </label>
        <label>Last Name
          <input
            type='text'
            name='last_name'
            value={ this.state.last_name }
            onChange={ this.inputChange }
          />
        </label>
        <label>Total References Understood
          <input
            type='text'
            name='rating'
            value={ this.state.rating }
            onChange={ this.inputChange }
          />
        </label>
        <fieldset>
          <legend>Hand Preference</legend>
          <input
            type='radio'
            name='handedness'
            value='right'
            id='right'
            onClick={(e) => { this.inputChange(e, 'right') } }
            checked={ this.state.handedness === 'right' }
          />
          <label htmlFor='right'>Right Hand</label>
          <input
            type='radio'
            name='handedness'
            value='left'
            id='left'
            onClick={(e) => { this.inputChange(e, 'left') } }
            checked={ this.state.handedness === 'left' }
          />
          <label htmlFor='left'>Left Hand</label>
        </fieldset>
        <a
          className='btn'
          onClick={ this.submit }
        >
          Add New Avenger
        </a>
        { !_.isEmpty(this.state.player) &&
          <React.Fragment>
            <hr />
            <h2>Avenger Added Successfully</h2>
            <h3>{ this.state.player.first_name } { this.state.player.last_name }</h3>
            <p>References Understood: { this.state.player.rating }</p>
            <p>Prefers: { _.capitalize(this.state.player.handedness) } Hand</p>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

export default Admin;
