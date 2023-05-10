import { combineReducers } from "redux";
import identityReducer from "./identity";
import userProfilesReducer from "./userProfiles";
import universitiesReducer from "./universities";
import eventTypesReducer from "./eventTypes";
import eventsReducer from "./events";
import eventParticipantsReducer from "./eventParticipants";
import ratingsReducer from "./ratings";

export default combineReducers({
    identity: identityReducer,
    userProfiles: userProfilesReducer,
    universities: universitiesReducer,
    eventTypes: eventTypesReducer,
    events: eventsReducer,
    eventParticipants: eventParticipantsReducer,
    ratings: ratingsReducer
})