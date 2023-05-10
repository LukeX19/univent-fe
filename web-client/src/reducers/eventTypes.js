const eventTypesReducer = (eventTypes = [], action) => {
    switch(action.type) {
        case 'GET_ALL_EVENT_TYPES':
            return action.payload;
        case 'GET_EVENT_TYPE':
            return action.payload;
        case 'ADD_EVENT_TYPE':
            return [...eventTypes, action.payload];
        case 'UPDATE_EVENT_TYPE':
            return [...eventTypes, action.payload];
        case 'DELETE_EVENT_TYPE':
            return eventTypes.filter((eventType) => eventType.id !== action.payload);
        default:
            return eventTypes;
    }
}

export default eventTypesReducer;