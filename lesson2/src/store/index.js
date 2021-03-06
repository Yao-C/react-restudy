//import { createStore, applyMiddleware, combineReducers } from "redux";
import { createStore, applyMiddleware, combineReducers } from "../kredux/";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
import isPromise from "is-promise";
import { isFSA } from "flux-standard-action";

// 定义修改规则
function countReducer(state = 0, action) {
  console.log("countReducer");
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - action.payload || 1;
    default:
      return state;
  }
}

// Homework: 测试
function visibilityReducer(state = true, action) {
  console.log("visibilityReducer");
  switch (action.type) {
    case "SHOW":
      return true;
    case "HIDE":
      return false;
    default:
      return state;
  }
}

//const store = createStore(countReducer, applyMiddleware(thunk, logger));
const store = createStore(
  combineReducers({ visibility: visibilityReducer, count: countReducer }),
  applyMiddleware(promise, thunk, logger)
);

export default store;

function logger({ getState }) {
  return (next) => (action) => {
    console.log("-------------------------------"); //sy-log

    let prevState = getState();
    console.log("prev state", prevState); //sy-log

    const returnValue = next(action);

    let nextState = getState();
    console.log("next state", nextState); //sy-log

    console.log("-------------------------------"); //sy-log
    return returnValue;
  };
}

function thunk({ getState, dispatch }) {
  return (next) => (action) => {
    if (typeof action === "function") {
      console.log("action function"); //sy-log
      return action(dispatch, getState);
    }

    console.log("action~"); //sy-log
    return next(action);
  };
}

function promise({ dispatch }) {
  return (next) => (action) => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}
