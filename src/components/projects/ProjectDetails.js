import React from 'react'
//conect it to firebase and reduxstate
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase' 
//compose add the two up here together
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { deleteProject } from '../../store/actions/projectActions'


const ProjectDetails = (props) => {
    //const id = props.match.params.id;
    // console.log(props)
    const {project, auth} = props;

        //redirect chunk
    // const {auth} = this.props; props added to the const definied up
    if (!auth.uid) return <Redirect to='/signin' />

    if (project) {
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                    <Link to="/"><div className="left details-go_back_button"><button className="btn-floating btn-small waves-effect waves-light white grey-text z-depth-1 hoverable" title="back to dashboard">&lt;</button></div></Link>
                    
                    <Link to="/"><div className="right details-edit_button"><button className="btn-floating btn-small waves-effect waves-light white grey-text z-depth-1 hoverable" title="edit">&#47;</button></div></Link>
                    
                    <Link to="/"><div className="right details-delete_button"><button className="btn-floating btn-small waves-effect waves-light white grey-text z-depth-1 hoverable" title="delete">X</button></div></Link>

                    <span className="card-title">{project.title}</span>
                    {/* <p>
                    {project.image} 
                    <br/>
                        <span className="red white-text">
                            {project.image.substring(project.image.search(/[A-Za-z0-9_\-]{11}/)).slice(0, 11)}    
                        </span>
                    </p> */}
                    { project.image !== ''
                    ?
                        project.image.search('https://www.youtube.com/embed/') !== -1
                        ?
                        <div className="video_holder">
                            <div className="video-container">
                                <iframe src={project.image} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="youtube-source"></iframe>
                            </div>
                        </div>
                        :
                            project.image.search("i1.adis.ws/v/") !== -1
                            ?
                            <div className="responsive-video">
                                <div id="vgs-control-replay"></div>
                                <video id="vgs-video" preload="auto" controls loop="loop" poster={project.image} onClick="this.play();">
                                    <source src={project.image.concat('', '/mp4_720p')} type="video/mp4" onError={(e)=>{e.target.onerror = null; e.target.parentElement.parentElement.style.display = "none"}}/>
                                        Your browser does not support the video tag.
                                </video>
                            </div>
                            :
                            <div className="image_holder">
                                <img className="responsive-img" src={project.image} alt={project.title} 
                                onError={(e)=>{e.target.onerror = null; e.target.parentElement.style.display = "none"}}
                                />
                            </div>
                    :
                        null
                    }
                        
                        <p>{project.content}</p>
                    </div>
                    <div className="card-action grey-text">
                        <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                        <div>{moment(project.createAt.toDate()).calendar()}</div>
                    </div>
                </div>
            </div>
        )
    }
     else {
        return (
                <div className="container center">
                    <p>Loading project...</p>
                </div>
        )
     }
}

const mapStateToProps = (state, ownProps) => {
    //console.log(state);
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    //this one at the bottom checking if we have project or not
    const project = projects ? projects[id] : null
    return {
        project: project,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: (project) => { dispatch(deleteProject(project)) }
    }
}

export default compose(
        connect(mapStateToProps, mapDispatchToProps),
        firestoreConnect([
            { collection: 'projects' }
        ])
    )(ProjectDetails)