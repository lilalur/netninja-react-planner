export const signIn = (creditentials) => {
    return (dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            creditentials.email,
            creditentials.password,
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS'});
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err});
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' });
        });
    }
}

export const signUp = (newUser) => {  //we going to give the newUser we want to sign up to this function
    return (dispatch, getState, {getFirebase, getFirestore}) => {  //remember we need getFirebase to authenticate and getFirestore to communicate with the database
        const firebase = getFirebase();
        const firestore = getFirestore();

        //created the new user
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password,
        ).then((resp) => {      //created the new user reord in Firestore
            //.doc() abd not .add() because we want the firebase generate the ID for us
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err});
        })
    }
}