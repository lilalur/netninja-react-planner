const initState = {
    authoError: null
}

const authReducer = (state = initState, action) => {
    //first need to check the action type
    switch(action.type){
        case 'LOGIN_ERROR':
        console.log('login error');
        return {
            ...state,
            authError: 'Login failed'
        }

        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null
            }
            
        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return state;

        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
                authError: null
            }

        case 'SIGNUP_ERROR':
            console.log('signup error', action.err.message);
            return {
                ...state,
                authError: action.err.message //we can uptput that error what we get from there, like password not long enough...etc
            }

        default:
            return state;
    }
}

export default authReducer