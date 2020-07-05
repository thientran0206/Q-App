import React,{Component} from 'react';
import {connect} from 'react-redux';
import {userLoginFetch} from '../reducers/action'

class Login extends Component {
    state = {
        username : "",
        password : ""
    }
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    
    handleSubmit = event => {
        event.preventDefault();
        this.props.userLoginFetch(this.state)
    }
    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            <div className="form-group">
                <label>Username</label>
                <input
                name='username'
                className="form-control"
                placeholder='Username'
                value={this.state.username}
                onChange={this.handleChange}
                /><br/>
            </div>
            <div className="form-group">
            <label>Password</label>
                <input
                type='password'
                name='password'
                className="form-control"
                placeholder='Password'
                value={this.state.password}
                onChange={this.handleChange}
                /><br/>
            </div>
            <button
                className="btn btn-primary"
                onClick={this.handleSubmit}>
                Login
                </button>
          </form>
        )
    }
}
const mapDispatchToProps = dispatch =>({
    userLoginFetch : userInfo => dispatch(userLoginFetch(userInfo))
})
export default connect(null,mapDispatchToProps)(Login);