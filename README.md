# Univent-FE

## Short Description
This application serves as a virtual space where students enrolled in multiple universities can create public events, sign as participants to events created by other users and send ratings for other users after an event has completed successfully.
This repository consists of the client project only. [The server project can be found here](https://github.com/LukeX19/univent-be)

## Technologies used
- React JS

## Prerequisites
### Setup
- Install [Node.js](https://nodejs.org/en/download)
- Run `npm install` to locally install all the needed packages

## Execution
To run the application, use `npm start`

## Additional Notes
This project uses a free API provided by Google, for the Maps component. In order to use this component:
- Create a free account on [Google Cloud Platform](https://cloud.google.com/)
- Generate a unique API key for Google Maps
- Create a local file named `.env.local` in `web-client` folder
- Add the following line in the `.env.local` file: `REACT_APP_GOOGLE_MAPS_API = ...`, where instead of `...` place the API key
