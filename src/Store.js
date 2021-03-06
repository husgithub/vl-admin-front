import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import vm from './redux/modules/vm';


//import Perf from 'react-addons-perf'

//const win = window;
//win.Perf = Perf

const reducer = combineReducers({
  vm:vm
});

const middlewares = [thunk];
/*
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant')());
}*/

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
);

export default createStore(reducer, {}, storeEnhancers);
