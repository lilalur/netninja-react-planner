const initState = {
    projects: [
        {id: '1', title: 'title 1', content: 'Lorem ipsum dolor sit'  },
        {id: '2', title: 'title 2', content: 'Lorem ipsum dolor sit'  },
        {id: '3', title: 'title 3', content: 'Lorem ipsum dolor sit'  },
    ]
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case'CREATE_PROJECT':
            console.log('created a project', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('created a project error', action.err);
            return state;
        case 'DELETE_PROJECT':
            console.log('deleted a project', action.project);
            return state;
        default:
            return state;
    }
}

export default projectReducer