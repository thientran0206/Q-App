import axios from"axios"

export const userPostFetch = user => {
    return dispatch => {
      return axios.post("http://localhost:8081/signup", user)
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            // Here you should have logic to handle invalid creation of a user.
            // This assumes your Rails API will return a JSON object with a key of
            // 'message' if there is an error with creating the user, i.e. invalid username
          } else {
            localStorage.setItem("token", data.token)
            dispatch(loginUser(data.user))
          }
        })
    }
  }
 
  export const userLoginFetch = user =>{
      return dispatch =>{
        return axios.post("http://localhost:8081/login", user)
        .then(data => {
          console.log(data);
          if (data.message) {
            // Here you should have logic to handle invalid creation of a user.
            // This assumes your Rails API will return a JSON object with a key of
            // 'message' if there is an error with creating the user, i.e. invalid username
          } else {
            localStorage.setItem("token", data.data.token)
            dispatch(loginUser(data.data.user))
          }
        })
      }
  }

  const loginUser = userObj => ({
      type: 'LOGIN_USER',
      payload: userObj
  })