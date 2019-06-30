//functional component
import React from 'react'
import moment from 'moment'

const ProjectSummary = ({project}) => {
    return (
        <div className="col s12 m4">
            <div className="card z-depth-0 hoverable project-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{project.title.slice(0,25)}{project.title.length > 25 ? ('...') : null}</span>

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
                                    <source src={project.image.concat('', '/mp4_480p')} type="video/mp4" onError={(e)=>{e.target.onerror = null; e.target.parentElement.parentElement.style.display = "none"}}/>
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
                    { (project.image !== '') || (project.image.onError === -1) ? 
                        <div className="content_holder"><p>{project.content.slice(0,50)}{project.content.length > 50 ? ('...') : null}</p></div>
                        :
                        <div className="content_holder noimage"><p>{project.content.slice(0,180)}{project.content.length > 180 ? ('...') : null}</p></div>
                    }

                    <div className="detail_holder">
                        <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
                        <p className="grey-text">{moment(project.createAt.toDate()).calendar()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProjectSummary

//for formating date we install npm install moment
