import {Component} from 'react'
import Cookies from 'js-cookie'

class LoginRoute extends Component {
  state = {userName: '', password: '', error: '', showError: false}

  userChange = e => {
    this.setState({userName: e.target.value})
  }

  passwordChange = e => {
    this.setState({password: e.target.value})
  }

  successLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expire: 30})
    history.replace('/')
  }

  failure = error => {
    this.setState({error, showError: true})
  }

  addToLogin = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userDetails = {userName, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.successLogin(data.jwt_token)
    } else {
      this.failure(data.error_msg)
    }
  }

  render() {
    const {userName, password, error, showError} = this.state
    return (
      <>
        <div className="main-container">
          <h1 className="heading">MOVIES</h1>
          <div className="card">
            <h2>Login</h2>
            <form className="form" onSubmit={this.addToLogin}>
              <label className="userName" htmlFor="user">
                USERNAME
              </label>
              <input
                className="inputUserName"
                type="text"
                placeholder="Enter USERNAME"
                id="user"
                value={userName}
                onChange={this.userChange}
              />
              <br />
              <label className="userName" htmlFor="password">
                USERNAME
              </label>
              <input
                className="inputUserName"
                type="password"
                placeholder="Enter PASSWORD"
                id="password"
                value={password}
                onChange={this.passwordChange}
              />
              <br />
              <button type="submit" className="button">
                Login
              </button>
              {showError && <p className="para">*{error}</p>}
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default LoginRoute
