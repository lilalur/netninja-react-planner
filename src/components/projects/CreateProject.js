import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'

class CreateProject extends Component {
    state= {
        image: '',
        alt_text: '',
        title: '',
        content: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }  
    handleChangeMedia = (e) => {
        this.setState({
            [e.target.id]: 
                
            e.target.value.search(/youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/) !== -1 
                ? 
                e.target.value.search("/embed/") !== -1
                    ?
                    e.target.value
                    :
                    'https://www.youtube.com/embed/'+e.target.value.substring(e.target.value.search(/[A-Za-z0-9_\-]{11}/)).slice(0, 11)
                :
                e.target.value.search("i1.adis.ws/v/") !== -1
                    ? 
                    e.target.value.split("/")[6] !== undefined
                        ? 
                        'https://i1.adis.ws/v/Argos'+e.target.value.substring(e.target.value.indexOf('/', 21), e.target.value.lastIndexOf('/'))
                        :
                        'https://i1.adis.ws/v/Argos'+e.target.value.substring(e.target.value.indexOf('/', 21))
                    :
                    e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
       //console.log(this.state);
        this.props.createProject(this.state)
        this.props.history.push('/')
    }
    
    render() {
        // redirect chunk
        const {auth} = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div>
                <div className="container">
                    
                    <form onSubmit={this.handleSubmit} className="white">
                        <h5 className="grey-text text-darken-3">Create new project</h5>

                        <div className="center">
                        { this.state.image !== ''
                        ?
                            this.state.image.search('https://www.youtube.com/embed/') !== -1
                            ?
                            <div className="video_holder">
                            <p>We going to store: <span className="grey-text">{this.state.image}</span></p>
                                <div className="video-container">
                                    <iframe src={this.state.image} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="youtube-source"></iframe>
                                </div>
                            </div>
                            :
                                this.state.image.search("i1.adis.ws/v/") !== -1
                                ?
                                <div className="responsive-video">
                                <p>We going to store: <span className="grey-text">{this.state.image}</span><br/><span className="text-lighten-1 grey-text">Please make sure on the Amplience system 360p/480p/720p all published from this video.</span></p>
                                    <div id="vgs-control-replay"></div>
                                    <video id="vgs-video" preload="auto" controls loop="loop" poster={this.state.image} onClick="this.play();">
                                        <source src={this.state.image.concat('', '/mp4_720p')} type="video/mp4" onError={(e)=>{e.target.onerror = null; e.target.parentElement.parentElement.style.display = "none"}}/>
                                            Your browser does not support the video tag.
                                    </video>
                                </div>
                                :
                                <div className="image_holder">
                                    <p>We going to store: <span className="grey-text">{this.state.image}</span></p>
                                    <img className="responsive-img" src={this.state.image} alt={this.state.alt_text} 
                                    onError={(e)=>{e.target.onerror = null; e.target.parentElement.style.display = "none"}}
                                    />
                                    <div className="input-field">
                                        <label htmlFor="alt_text">Please give the image an Alt-text</label>
                                        <input type="text" id="alt_text" onChange={this.handleChange} />
                                    </div>
                                </div>
                        :
                            null
                        }
                        </div>
                        

                        <div className="input-field">
                            <label htmlFor="image">Media source (URL)</label>
                            <input type="url" id="image" onChange={this.handleChangeMedia} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field">
                            <label htmlFor="content">Project Content</label>
                            <textarea id="content" className="materialize-textarea" onChange={this.handleChange} required></textarea>
                        </div>
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">Create</button>
                        </div>
                    </form>
                </div>        
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
