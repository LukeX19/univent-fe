const eventsReducer = (events = [], action) => {
    switch(action.type) {
        case 'GET_ALL_EVENTS':
            return action.payload;
        case 'GET_EVENT':
            return action.payload;
        case 'ADD_EVENT':
            return [...events, action.payload];
        case 'UPDATE_EVENT':
            return [...events, action.payload];
        case 'DELETE_EVENT':
            return events.filter((event) => event.id !== action.payload);
        default:
            return events;
    }
}

export default eventsReducer;