import React, { useEffect } from 'react';
import {Link,withRouter,Switch} from 'react-router-dom';
import {connect, useSelector} from 'react-redux';
import {getProfileFetch} from '../reducers/action';

function NavBar(props){

    // const signOut = () =>{
    //     auth0Client.signOut();
    //     props.history.replace('/');
    // };
    const reducer = useSelector(state => state.reducer);
    const {currentUser} = reducer;
    useEffect(() =>{
        console.log(currentUser)
        if(currentUser) props.history.replace('/');
    },[currentUser])
    return(
        <nav className="navbar navbar-dark bg-primary fixed-top">
            <Link className="navbar-brand" to="/">
                Q&App
            </Link>
            <Link className="navbar-brand" to="/login">
                Login
            </Link>
            <Link className="navbar-brand" to="/signup">
                Signup
            </Link>
            {/* {
                !auth0Client.isAuthenticated() &&
                <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
            }
            {
                auth0Client.isAuthenticated() &&
                <div>
                    <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
                    <button className="btn btn-dark" onClick={() => {signOut()}}>Sign Out</button>
                </div>
            } */}
        </nav>
       
    );
}
export default withRouter(NavBar);