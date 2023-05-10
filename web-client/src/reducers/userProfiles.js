const userProfilesReducer = (userProfiles = [], action) => {
    switch(action.type) {
        case 'GET_ALL_USER_PROFILES':
            return action.payload;
        case 'GET_USER_PROFILE':
            return action.payload;
        case 'UPDATE_USER_PROFILE':
            return [...userProfiles, action.payload];
        case 'DELETE_USER_PROFILE':
            return userProfiles.filter((userProfile) => userProfile.id !== action.payload);
        default:
            return userProfiles;
    }
}

export default userProfilesReducer;