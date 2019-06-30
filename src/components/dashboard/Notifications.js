//Functional component instead of clas s component

import React from 'react';
import moment from 'moment'


const Notifications = (props) => {
    const {notifications} = props;
    return (
       <div className="section">
           <div className="card nopadding-bottom z-depth-0">
               <div className="card-content nopadding-bottom">
               <div className="white-overlay_box"></div>
                   <span className="card-title">Notifications</span>
                   <ul className="notifications">
                       {notifications && notifications.map(notification => {
                           return (
                               <li key={notification.id}>
                                   <span className="pink-text">{notification.user} </span>
                                   <span>{notification.content} </span>
                                   <span className="grey-text note-date">
                                       {moment(notification.time.toDate()).fromNow()}
                                   </span>
                               </li>
                           )
                       })} 
                       {/* the notifications && means it checking if there is any notification before its starting to map them, if there is nothing then its not going to map */}
                   </ul>
               </div>
           </div>
       </div>
    )
}

export default Notifications