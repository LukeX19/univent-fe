const ratingsReducer = (ratings = [], action) => {
    switch(action.type) {
        case 'GET_ALL_RATINGS':
            return action.payload;
        case 'GET_RATING':
            return action.payload;
        case 'ADD_RATING':
            return [...ratings, action.payload];
        case 'DELETE_RATING':
            return ratings.filter((rating) => rating.id !== action.payload);
        default:
            return ratings;
    }
}

export default ratingsReducer;