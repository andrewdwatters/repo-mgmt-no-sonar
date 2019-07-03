const firebase = require("firebase");

const config = {
  apiKey: "AIzaSyAsTMGn8oPji080MEhJcMw-Nu78dgp5U54",
  authDomain: "assignment-manager-techtonic.firebaseapp.com",
  databaseURL: "https://assignment-manager-techtonic.firebaseio.com",
  projectId: "assignment-manager-techtonic",
  storageBucket: "assignment-manager-techtonic.appspot.com",
  messagingSenderId: "313374651683"
};

firebase.initializeApp(config);

module.exports = {
  db: firebase.database()
};
