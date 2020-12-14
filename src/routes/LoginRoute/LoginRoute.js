import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginRoute.css'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className='login-section'>
        <div>
          <h2 className='Login-Subtitle'>Login</h2>
        </div>
        <div>
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
          />
        </div>
        
      </section>
    );
  }
}

export default LoginRoute
