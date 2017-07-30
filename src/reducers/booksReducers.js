"use strict"

// BOOKS REDUCERS
export function booksReducers(
  state={
    books:[]
  },
  action){
  switch (action.type) {
    case "GET_BOOKS":
    return {...state, books:[...action.payload]};

    case "POST_BOOK":
    return {...state,
      books: [...state.books, ...action.payload],
      msg:'Saved! Click to continue',
      style:'success',
      validation:'success'
    };

    case "POST_BOOK_REJECTED":
    return {...state, msg:'Please, try again', style:'danger', validation:'error'};

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

    case "RESET_BUTTON":
    return {...state, msg:null, style:'primary', validation:null};
    break;
  };
  return state;
};
