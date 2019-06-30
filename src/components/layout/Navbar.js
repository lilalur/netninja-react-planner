//Functional component instead of clas s component

import React from 'react';
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
    const { auth, profile } = props;
    //console.log(auth);
    //2. and we can show different content for them regarding to the result
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />; //we can add the profile directly to the SignedInLinks but we passing instead from its parents in this way
    return (

        <nav className="nav-wrapper grey darken-3">
            <div className="container navbar">
                <div className="peters_logo"><Link to="/"><img className="img-responsive" src="/img/inverse_logo.png" alt=""/><h1>Organiser V1.5</h1></Link></div>
                <div className="main-page-links">{ links }</div>
            </div>
        </nav>


    )
}

//1. we can use this to inspect if the user signed in or out
const mapStateToProps = (state) => {
    //console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps)(Navbar)