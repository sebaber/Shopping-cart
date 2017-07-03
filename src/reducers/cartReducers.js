"use strict"
//CART REDUCERS
export function cartReducers(state={cart:[]}, action){
  switch (action.type) {
    case "ADD_TO_CART":
    return {...state,
      cart: action.payload,
      totalAmount: totals(action.payload).amount,
      totalQty: totals(action.payload).qty
    };
    case "UPDATE_CART":
    //Create a copy of current array of cart
    const currentUpdateCart = [...state.cart];
    // Determine at wich index in cart is the book to be deleted
    const indexToUpdate = currentUpdateCart.findIndex(
      function(cart){
        return cart._id === action._id;
      }
    );
    //Create cart update
    const newCartUpdated = {
      ...currentUpdateCart[indexToUpdate],
       quantity: currentUpdateCart[indexToUpdate].quantity + action.unit
     };
    //use slice to remove the book
    let cartUpdate = [
        //From beginning to indexToDelete(not included)
        ...currentUpdateCart.slice(0, indexToUpdate),
        newCartUpdated,
        //From indexToDelete+1 to final
        ...currentUpdateCart.slice(indexToUpdate+1)
    ];
    return {...state,
      cart:cartUpdate,
      totalAmount: totals(cartUpdate).amount,
      totalQty: totals(cartUpdate).qty
    };
    case "DELETE_CART_ITEM":
    return {...state,
      cart: action.payload,
      totalAmount: totals(action.payload).amount,
      totalQty: totals(action.payload).qty
    };
  }
  return state;
}

//CALCULATE TOTALS
export function totals(payloadArr){
  const totalAmount = payloadArr.map(function(cartArr){
    return cartArr.price * cartArr.quantity;
  }).reduce(function(a, b){
    return a + b;
  }, 0); //start summing from index0

  const totalQty = payloadArr.map(function(cartArr){
    return cartArr.quantity;
  }).reduce(function(a, b){
    return a + b;
  }, 0); //start summing from index0

  return {amount: totalAmount.toFixed(2), qty: totalQty};
}
