import React, { Component } from 'react'
import logo from '../../logo.png'
import '../../App.css'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePass = this.handleChangePass.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value })
  }

  handleChangePass(event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    let data = {
      email: this.state.email,
      password: this.state.password
    }
    let url = 'http://localhost:8080/register'
    this.postData(url, data)

    this.setState({
      email: '',
      password: ''
    })
  }

  postData(url, data) {
    fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'content-type': 'application/json' 
      },
      mode: 'cors',
    }).then(function(response) {
      console.log(response.json())
    })
  }

  render() {
    return(
      <div className="container">
        <div className="login-box">
          <form >
            <div className="image-container">
              <img className="league-logo" src={logo} className="image" alt="site-logo" />
            </div>

            <div className="form-container">
              <label>Email</label>
              <input type='text' value={this.state.email} onChange={this.handleChangeEmail} />

              <label>Password</label>
              <input type='password' value={this.state.password} onChange={this.handleChangePass} />

              <button type='submit' onClick={this.handleSubmit}>Login</button>
            </div>

            <div className="forgot-pass">
              <a href="#">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
