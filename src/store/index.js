import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import firebase from "../../firebase";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";

import rootReducer from "./reducers";

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady: true, // attaches auth is ready promise to store
};

if (typeof window !== "undefined") {
  const composeEnhancers =
    process.env.NODE_ENV === "development"
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
      : compose;

  export const store = createStore(
    rootReducer,
    composeEnhancers(
      reactReduxFirebase(firebase, rrfConfig),
      reduxFirestore(firebase),
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
    )
  );
}
