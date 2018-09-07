import React from 'react'

import request from 'superagent'

import Message from './components/message'

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      error_message: '',
      error: false
    }

    this.loginUser = this.loginUser.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  loginUser() {
    let body = JSON.stringify({
      email: this.state.email,
      password: this.state.password
    })

    request
      .post('https://players-api.developer.alchemy.codes/api/login')
      .send(body)
      .set('Content-Type', 'application/json')
      .then(res => {
        if (res.body.success) {
          sessionStorage.setItem('token', res.body.token);
          // console.log(sessionStorage.getItem('token'));
          this.props.history.push(`/manage`)
        }
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
      [name]: value
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Login to the Avengers Initiative</h1>
        { this.state.error &&
          <Message
            type='error'
            message={ this.state.error_message }
          />
        }
        <label>Email
          <input
            type='text'
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
        <button
          onClick={ this.loginUser }
        >
        Login
        </button>
      </React.Fragment>
    )
  }
}

export default Login;
