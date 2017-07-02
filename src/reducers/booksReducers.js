"use strict"

// BOOKS REDUCERS
export function booksReducers(state={books:[]}, action){
  // state = [];
  switch (action.type) {
    case "POST_BOOK":
    // let books = state.books.concat(action.payload);
    // return {books};
    return {books: [...state.books, ...action.payload]};
    case "DELETE_BOOK":
    //Create a copy of current array of books
    const currentBooks = [...state.books];
    // Determine at wich index in books is the book to be deleted
    const indexToDelete = currentBooks.findIndex(
      function(book){
        return book.id === action.payload.id;
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
        return book.id === action.payload.id;
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
