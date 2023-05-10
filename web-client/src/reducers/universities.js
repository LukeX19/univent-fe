const universitiesReducer = (universities = [], action) => {
    switch(action.type) {
        case 'GET_ALL_UNIVERSITIES':
            return action.payload;
        case 'GET_UNIVERSITY':
            return action.payload;
        case 'ADD_UNIVERSITY':
            return [...universities, action.payload];
        case 'UPDATE_UNIVERSITY':
            return [...universities, action.payload];
        case 'DELETE_UNIVERSITY':
            return universities.filter((university) => university.id !== action.payload);
        default:
            return universities;
    }
}

export default universitiesReducer;