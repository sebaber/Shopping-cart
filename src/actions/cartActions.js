"use strict"
import axios from 'axios';

//GET CART
export function getCart(){
  return function(dispatch){
    axios.get("/api/cart")
    .then(function(response){
      dispatch({type: "GET_CART", payload: response.data})
    })
    .catch(function(err){
      dispatch({type:"ADD_TO_CART_REJECTED", msg: "error getting the cart"})
    });
  };
}

//ADD TO CART
export function addToCart(cart){
  return function(dispatch){
    axios.post("/api/cart", cart)
    .then(function(response){
      dispatch({type: "ADD_TO_CART", payload: response.data})
    })
    .catch(function(err){
      dispatch({type:"ADD_TO_CART_REJECTED", msg: "error when adding to the cart"})
    });
  };
}

//UPDATE CART
export function updateCart(_id, unit, cart){
  //Create a copy of current array of cart
  const currentUpdateCart = cart;
  // Determine at wich index in cart is the book to be deleted
  const indexToUpdate = currentUpdateCart.findIndex(
    function(_cart){
      return _cart._id === _id;
    }
  );
  //Create cart update
  const newCartUpdated = {
    ...currentUpdateCart[indexToUpdate],
     quantity: currentUpdateCart[indexToUpdate].quantity + unit
   };
  //use slice to remove the book
  let cartUpdate = [
      //From beginning to indexToDelete(not included)
      ...currentUpdateCart.slice(0, indexToUpdate),
      newCartUpdated,
      //From indexToDelete+1 to final
      ...currentUpdateCart.slice(indexToUpdate+1)
  ];

  return function(dispatch){
    axios.post("/api/cart", cartUpdate)
    .then(function(response){
      dispatch({type: "UPDATE_CART", payload: response.data})
    })
    .catch(function(err){
      dispatch({type:"UPDATE_CART_REJECTED", msg: "error when updating the cart"})
    });
  };
  return {
    type:"UPDATE_CART",
    payload: cartUpdate
  }
}

//DELETE FROM CART
export function deleteCartItem(cart){
  return function(dispatch){
    axios.post("/api/cart", cart)
    .then(function(response){
      dispatch({type: "DELETE_CART_ITEM", payload: response.data})
    })
    .catch(function(err){
      dispatch({type:"DELETE_CART_ITEM_REJECTED", msg: "error when deleting to the cart"})
    });
  };
}
