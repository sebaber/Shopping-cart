"use strict"

// BOOKS REDUCERS
export function booksReducers(
  state={
    books:[
      {
        _id: 1,
        title: "1st book",
        description: "this is the 1st book",
        price: 43.33
      },
      {
        _id: 2,
        title: "2nd book",
        description: "this is the 2nd book",
        price: 53.33
      }
    ]
  },
  action){
  switch (action.type) {
    case "GET_BOOKS":
    return {...state, books:[...state.books]};

    case "POST_BOOK":
    return {books: [...state.books, ...action.payload]};

    case "DELETE_BOOK":
    //Create a copy of current array of books
    const currentBooks = [...state.books];
    // Determine at wich index in books is the book to be deleted
    const indexToDelete = currentBooks.findIndex(
      function(book){
        return book._id == action.payload;
      }
    );
    //use slice to remove the book
    return {
      books: [
        //From beginning to indexToDelete(not included)
        ...currentBooks.slice(0, indexToDelete),
        //From indexToDelete+1 to final
        ...currentBooks.slice(indexToDelete+1)
      ]
    };

    case "UPDATE_BOOK":
    //Create a copy of current array of books
    const currentUpdateBooks = [...state.books];
    // Determine at wich index in books is the book to be deleted
    const indexToUpdate = currentUpdateBooks.findIndex(
      function(book){
        return book._id === action.payload._id;
      }
    );
    //Create book update
    const newBookUpdated = {
      ...currentUpdateBooks[indexToUpdate],
       title: action.payload.title
     };
    //use slice to remove the book
    return {
      books: [
        //From beginning to indexToDelete(not included)
        ...currentUpdateBooks.slice(0, indexToUpdate),
        newBookUpdated,
        //From indexToDelete+1 to final
        ...currentUpdateBooks.slice(indexToUpdate+1)
      ]
    };
  };
  return state;
};
