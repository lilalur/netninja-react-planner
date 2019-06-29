//class based component

import React, { Component } from 'react';
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
// import { staticHTML } from '../../store/actions/staticHTML'

class Dashboard extends Component {
    render () {
        //console.log(this.props);
        const {projects, auth, notifications} = this.props;
        //fi we dotn have auth.uid then redirect us to somewhere else.
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m12">
                        <ProjectList projects={projects} />
                        {/* <a id="exportxt" href="#">SAVE PROJECT IN TXT FILE</a>  */}
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m12">
                        <Notifications notifications={notifications} /> 
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        ///this is the sorce we loading the datas
        projects: state.firestore.ordered.projects,
        ///remeber we have access to the authentication status on the state.firebase.auth
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}

export default compose(
                    connect(mapStateToProps),
                    firestoreConnect([
                        { collection: 'projects', orderBy: ['createAt', 'desc']},
                        { collection: 'notifications', limit: 4, orderBy: ['time', 'desc']}
                    ])
                )(Dashboard)

                