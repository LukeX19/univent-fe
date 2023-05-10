const eventParticipantsReducer = (eventParticipants = [], action) => {
    switch(action.type) {
        case 'GET_ALL_EVENT_PARTICIPANT_COMBINATIONS':
            return action.payload;
        case 'GET_EVENT_PARTICIPANTS':
            return action.payload;
        case 'GET_PARTICIPANT_EVENTS':
            return action.payload;
        case 'ADD_EVENT_PARTICIPANT':
            return [...eventParticipants, action.payload];
        case 'DELETE_EVENT_PARTICIPANT':
            return eventParticipants.filter((event) => event.id !== action.payload);
        default:
            return eventParticipants;
    }
}

export default eventParticipantsReducer;