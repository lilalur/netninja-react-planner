//Functional component instead of clas s component

import React from 'react';
import { connect } from 'react-redux'

const Footer = () => {

            // Wait for the page to load first
            window.onload = function() {

                //Get a reference to the link on the page
                // with an id of "exportxt"
                const a = this.document.getElementById("exportxt");
  
                //Set code to run when the link is clicked
                // by assigning a function to "onclick"
                a.onclick = function() {
  
                  // Your code here...
  
  
      function downloadInnerHtml(filename, elId, mimeType) {
          const elHtml = this.document.getElementById(elId).innerHTML;
          const link = this.document.createElement('a');
          mimeType = mimeType || 'text/plain';
          link.setAttribute('download', filename);
          link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
          link.click(); 
      }
      const fileName =  'myexportedhtml.html'; // You can use the .txt extension if you want
      downloadInnerHtml(fileName, 'saveToHtmlThis','text/plain');
                  //If you don't want the link to actually 
                  // redirect the browser to another page, then
                  // return false at the end of this block.
                  // Note that this also prevents event bubbling,
                  // which is probably what we want here, but won't 
                  // always be the case.
                  return false;
                }
              }

    return (

        <nav className="nav-wrapper grey darken-3">
            <div className="container footer">
                <button className="btn green" id="exportxt" href="#">SAVE PROJECT IN TXT FILE</button> 
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

export default connect(mapStateToProps)(Footer)