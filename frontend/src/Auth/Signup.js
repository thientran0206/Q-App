import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userPostFetch} from '../reducers/action';

class Signup extends Component {
  state = {
    username: "",
    password: "",
    avatar: "",
    bio: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.userPostFetch(this.state)
  }

  render() {
    return (
      <form>
        <h1>Sign Up For An Account</h1>
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
        <div className="form-group">
            <label>Avatar</label>
            <input
            name='avatar'
            className="form-control"
            placeholder='Avatar (URL)'
            value={this.state.avatar}
            onChange={this.handleChange}
            /><br/>
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea
            name='bio'
            className="form-control"
            placeholder='Bio'
            value={this.state.bio}
            onChange={this.handleChange}
            /><br/>
        </div>
        <button
          className="btn btn-primary"
          onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Signup);