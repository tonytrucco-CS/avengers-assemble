import React from 'react'

import request from 'superagent'

import Message from './components/message'

class New extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      error: false,
      error_message: '',
      success: false
    }
    this.inputChange = this.inputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.addAdmin = this.addAdmin.bind(this);
  }

  submit() {
    if (!this.state.first_name || !this.state.last_name || !this.state.email || !this.state.password || !this.state.confirm_password) {
      this.setState({
        error: true,
        error_message: 'You are missing one or more required fields'
      })
      return;
    }
    let body = JSON.stringify({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      confirm_password: this.state.confirm_password
    })

    this.addAdmin(body);
  }

  addAdmin(body) {
    if (body)
    request
      .post('https://players-api.developer.alchemy.codes/api/user')
      .send(body)
      .set('Content-Type', 'application/json')
      .then(res => {
        this.setState({
          success: true
        })
      })
      .catch(err => {
        this.setState({
          error: true,
          error_message: err.response.body.error.message
        })
      });
  }

  inputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      error: false,
      success: false
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Add a New Director</h1>
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
        <label>Email
          <input
            type='email'
            name='email'
            value={ this.state.email }
            onChange={ this.inputChange }
          />
        </label>
        <label>Password
          <input
            type='password'
            name='password'
            value={ this.state.password }
            onChange={ this.inputChange }
          />
        </label>
        <label>Confirm Password
          <input
            type='password'
            name='confirm_password'
            value={ this.state.confirm_password }
            onChange={ this.inputChange }
          />
        </label>
        <a
          className='btn'
          onClick={ this.submit }
        >
        Submit Director Information
        </a>
        { this.state.success &&
          <h2>Director credentials accepted</h2>
        }
      </React.Fragment>
    )
  }
}

export default New;
