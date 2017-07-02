"use strict"
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
//IMPORT COMBINED REDUCERS
import reducers from './reducers/index';

//IMPORT ACTIONS
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

// STEP 1 create the store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

// STEP 2 create and dispatch actions
//-->> BOOKS ACTIONS <<--
//POST
store.dispatch(postBooks(
  [
    {
      id: 1,
      title: "1st book",
      price: 33.33
    },
    {
      id: 2,
      title: "2nd book",
      price: 33.33
    }
  ])
);

//DELETE
store.dispatch(deleteBooks({id:1}));

//UPDATE
store.dispatch(updateBooks({
  id:2,
  title:"2nd book updated"
}));

//-->> CART ACTIONS <<--
//ADD to cart
store.dispatch(addToCart([{id: 1}]));
