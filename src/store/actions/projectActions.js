//here we returning a function and not an action
export const createProject = (project) => {
    //pause dispatch
    return (dispatch, getState, { getFirebase, getFirestore}) => {
            //make async call to database then continue the dispatch
            const firestore = getFirestore();
            const profile = getState().firebase.profile;
            const authorId = getState().firebase.auth.uid;
            // console.log(authorId, profile.firstName);
            firestore.collection('projects').add({
                ...project,
                authorFirstName: profile.firstName,
                authorLastName: profile.lastName,
                authorId: authorId,
                createAt: new Date(),
            }).then(() => {
                //continue to dispatch the stuff
                dispatch({ type: 'CREATE_PROJECT', project});
            }).catch((err) => {
                //in case of error
                dispatch({ type: 'CREATE_PROJECT_ERROR', err});
            });
    }
};

// export const deletePost = (id) => {
//     return {
//         type: 'DELETE_POST',
//         id : id
//     }
// };

export const deleteProject = (project) => {
    //pause dispatch
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        //make async call to database then continue the dispatch
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        // console.log(authorId, profile.firstName);
        firestore.remove('projects').then(() => {
            //continue to dispatch the stuff
            dispatch({ type: 'DELETE_PROJECT', project});
        }).catch((err) => {
            //in case of error
            dispatch({ type: 'DELETE_PROJECT_ERROR', err});
        });
}
};