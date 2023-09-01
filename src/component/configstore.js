import { createStore, applyMiddleware, combineReducers } from 'redux';
// import schedule from './schedule';
// import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//export const history = createBrowserHistory();

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

// const rootReducer = combineReducers({ schedule });
const dummyDataReducer = (state=[], action) => state;

const rootReducer= combineReducers({
    someReducer : dummyDataReducer,
});

// // Dummy data
// const dummyData = [
//     { id: 1, name: "Schedule 1", description: "This is schedule 1" },
//     { id: 2, name: "Schedule 2", description: "This is schedule 2" },
//   ];
  
//   // Dummy reducer
//   const rootReducer = (state = dummyData, action) => {
//       switch (action.type) {
//           default:
//               return state;
//       }
//   };

const store = createStore(rootReducer, composeWithDevTools(enhancer));

export default store;